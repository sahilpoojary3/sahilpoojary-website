import { profile } from "@/config/profile";
import { monthYearToSortable } from "@/lib/date";
import { searchArticles, findArticleByTitle, articleTakeaway, allArticleMatches } from "./articles";
import type { AnswerLength, AskResult, Classification, DomainId, DomainKnowledge, EntityItem, Fact } from "./types";

const FALLBACK_GENERIC =
  "I don't have enough information on Sahil's profile to answer that. Try asking about his experience, education, skills, or what he writes about.";

function factsByTag(facts: Fact[], tag: Fact["tag"]): Fact[] {
  return facts.filter((f) => f.tag === tag);
}

function join(sentences: (string | undefined)[]): string {
  return sentences.filter(Boolean).join(" ");
}

function bulletize(lines: string[]): string {
  return lines.map((l) => `• ${l}`).join("\n");
}

// ~35% of the time, on short/normal answers only, append one genuinely
// useful next-step line instead of a generic "want to know more?" — and
// never two turns in a row.
function maybeNaturalFollowUp(line: string | null, length: AnswerLength, lastAssistantText: string | undefined): string {
  if (!line || length === "detailed") return "";
  if (lastAssistantText?.trim().endsWith("?")) return "";
  return Math.random() < 0.35 ? ` ${line}` : "";
}

function composeEntity(entity: EntityItem, length: AnswerLength, subAngle: Classification["subAngle"]): AskResult {
  if (subAngle) {
    const hit = factsByTag(entity.facts, subAngle === "who" ? "where" : subAngle)[0];
    if (hit) return { answer: hit.text, grounded: true, sources: [entity.id], links: [] };
    const summary = factsByTag(entity.facts, "summary")[0];
    return {
      answer: summary
        ? `I don't have a documented reason for that specific choice — only that it happened: ${summary.text}`
        : "I don't have a documented reason for that specific choice on record.",
      grounded: false,
      sources: [entity.id],
      links: [],
    };
  }

  const summary = factsByTag(entity.facts, "summary")[0]?.text ?? "";
  const details = factsByTag(entity.facts, "detail").map((f) => f.text);

  const articleLinks = (entity.relatedArticleSlugs ?? [])
    .map((slug) => allArticleMatches().find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => !!a);

  if (length === "short") {
    let answer = summary;
    if (articleLinks.length && Math.random() < 0.4) {
      answer += ` He's actually written about this in "${articleLinks[0].title}."`;
    }
    return { answer, grounded: true, sources: [entity.id], links: articleLinks.length ? [{ label: articleLinks[0].title, href: articleLinks[0].href }] : [] };
  }

  if (length === "normal") {
    const answer = join([summary, details.slice(0, 2).join(" ")]);
    return {
      answer,
      grounded: true,
      sources: [entity.id],
      links: articleLinks.map((a) => ({ label: a.title, href: a.href })),
    };
  }

  // detailed
  const skillsFact = factsByTag(entity.facts, "skills")[0]?.text;
  const body = details.length >= 3 ? bulletize(details) : details.join(" ");
  const answer = join([summary, body, skillsFact]);
  const articleNote = articleLinks.length
    ? `\n\nHe's written about this directly: "${articleLinks.map((a) => a.title).join('", "')}."`
    : "";
  return {
    answer: answer + articleNote,
    grounded: true,
    sources: [entity.id],
    links: articleLinks.map((a) => ({ label: a.title, href: a.href })),
  };
}

function composeItemsOverview(domain: DomainKnowledge, length: AnswerLength): AskResult {
  const items = domain.items ?? [];
  if (length === "short") {
    const line = items.map((i) => `${i.label} (${i.start}–${i.end})`).join("; ");
    return { answer: `${domain.id === "education" ? "He has" : "He's held"} ${items.length}: ${line}.`, grounded: true, sources: [domain.id], links: [] };
  }
  const summaries = items.map((i) => factsByTag(i.facts, "summary")[0]?.text ?? i.label);
  return { answer: bulletize(summaries), grounded: true, sources: [domain.id], links: [] };
}

function composeDomain(domain: DomainKnowledge, length: AnswerLength, subAngle: Classification["subAngle"]): AskResult {
  // Handle a "why"/"where"/"when" follow-up before falling into the
  // items-overview or fact-list paths below — otherwise a domain with
  // multiple items (education, experience) ignores the sub-question
  // entirely and just repeats its overview.
  if ((subAngle === "where" || subAngle === "when") && domain.items?.length) {
    const lines = domain.items
      .map((item) => {
        const hit = factsByTag(item.facts, subAngle)[0];
        return hit ? `${item.label} — ${hit.text}` : null;
      })
      .filter((l): l is string => !!l);
    if (lines.length) return { answer: lines.join(" "), grounded: true, sources: [domain.id], links: [] };
  }

  if (subAngle === "why") {
    const why = domain.facts.find((f) => f.tag === "why");
    if (why) return { answer: why.text, grounded: true, sources: [domain.id], links: domain.source ? [domain.source] : [] };
    // Items domains (education/experience) have no other sensible answer
    // to a bare "why" — say so honestly instead of repeating the overview.
    // Non-items domains (career, business, etc.) still have a genuinely
    // useful normal answer even without a documented "why" fact, so fall
    // through to the regular composition below rather than hard-stopping.
    if (domain.items?.length) {
      const summaryText = factsByTag(domain.items[0].facts, "summary")[0]?.text ?? "";
      return {
        answer: summaryText
          ? `I don't have a documented reason for that — only that it happened: ${summaryText}`
          : "I don't have a documented reason for that on record.",
        grounded: false,
        sources: [domain.id],
        links: [],
      };
    }
  }

  if (domain.items && domain.items.length > 0) {
    return composeItemsOverview(domain, length);
  }

  const summary = factsByTag(domain.facts, "summary")[0];
  const facts = domain.facts.filter((f) => f.tag !== "summary");

  if (length === "short") {
    return { answer: summary?.text ?? FALLBACK_GENERIC, grounded: !!summary, sources: summary ? [domain.id] : [], links: domain.source ? [domain.source] : [] };
  }

  if (length === "normal") {
    const factOnly = facts.filter((f) => f.type === "fact").slice(0, 2).map((f) => f.text);
    const oneInterpretation = facts.find((f) => f.type === "interpretation");
    const answer = join([summary?.text, ...factOnly, factOnly.length < 2 && oneInterpretation ? oneInterpretation.text : ""]);
    return { answer, grounded: true, sources: [domain.id], links: domain.source ? [domain.source] : [] };
  }

  // detailed
  const lines = [summary?.text, ...facts.map((f) => f.text)].filter(Boolean) as string[];
  const answer = lines.length >= 4 ? bulletize(lines) : lines.join(" ");
  return { answer, grounded: true, sources: [domain.id], links: domain.source ? [domain.source] : [] };
}

function mergedTimeline(knowledge: Record<DomainId, DomainKnowledge>): EntityItem[] {
  const items = [...(knowledge.education.items ?? []), ...(knowledge.experience.items ?? [])];
  return items.sort((a, b) => monthYearToSortable(a.start) - monthYearToSortable(b.start));
}

function composeTemporal(
  classification: Classification,
  knowledge: Record<DomainId, DomainKnowledge>
): AskResult {
  const timeline = mergedTimeline(knowledge);
  const anchorText = classification.temporal?.anchor ?? undefined;
  let anchor: EntityItem | null = classification.entity;

  if (!anchor && anchorText) {
    anchor = timeline.find((item) => item.aliases.some((a) => anchorText.includes(a) || a.includes(anchorText))) ?? null;
  }

  // No specific item, but a whole domain is in context (e.g. "before/after
  // his education" without naming a degree) — "before" naturally anchors
  // to the earliest item in that domain, "after" to the most recent one.
  if (!anchor && classification.domain) {
    const domainItems = knowledge[classification.domain].items;
    if (domainItems?.length) {
      const sorted = [...domainItems].sort((a, b) => monthYearToSortable(a.start) - monthYearToSortable(b.start));
      anchor = classification.temporal!.direction === "before" ? sorted[0] : sorted[sorted.length - 1];
    }
  }

  if (!anchor) {
    return {
      answer: "Before or after which point in his timeline — his MBA, a specific job, or something else?",
      grounded: false,
      sources: [],
      links: [],
    };
  }

  const anchorIndex = timeline.findIndex((i) => i.id === anchor!.id);
  const direction = classification.temporal!.direction;
  const neighbor = direction === "before" ? timeline[anchorIndex - 1] : timeline[anchorIndex + 1];

  if (!neighbor) {
    const edge = direction === "before" ? "the earliest thing documented on his profile" : "the most recent thing documented on his profile";
    return {
      answer: `That's ${edge} — there's nothing ${direction} it on record.`,
      grounded: true,
      sources: [anchor.id],
      links: [],
    };
  }

  const summary = factsByTag(neighbor.facts, "summary")[0]?.text ?? neighbor.label;
  return { answer: summary, grounded: true, sources: [neighbor.id], links: [] };
}

function composeArticles(classification: Classification): AskResult {
  if (classification.articleIntent === "synthesize") {
    const all = allArticleMatches();
    if (all.length === 0) {
      return { answer: "He hasn't published anything yet — the Insights section is new.", grounded: true, sources: [], links: [] };
    }
    const takeaways = all.map((a) => articleTakeaway(a.slug));
    const answer = `Across his ${all.length} articles so far, the throughline is operations under real conditions — not theory. ${takeaways.join(" ")}`;
    return { answer, grounded: true, sources: all.map((a) => a.slug), links: all.map((a) => ({ label: a.title, href: a.href })) };
  }

  if (classification.articleIntent === "explain") {
    const all = allArticleMatches();
    const match = classification.articleQueryTerms.length === 0
      ? all[all.length - 1] ?? null
      : findArticleByTitle(classification.articleQueryTerms) ?? searchArticles(classification.articleQueryTerms)[0] ?? null;
    if (!match) {
      return {
        answer: "I don't see an article specifically about that yet — his published pieces so far cover event operations, a blood donation drive, and a comparison between two of his jobs.",
        grounded: true,
        sources: [],
        links: allArticleMatches().map((a) => ({ label: a.title, href: a.href })),
      };
    }
    const takeaway = articleTakeaway(match.slug);
    return {
      answer: `"${match.title}" — ${match.dek} ${takeaway}`,
      grounded: true,
      sources: [match.slug],
      links: [{ label: match.title, href: match.href }],
    };
  }

  // search
  const matches = searchArticles(classification.articleQueryTerms);
  if (matches.length === 0) {
    const topic = classification.articleQueryTerms
      .slice(0, 3)
      .map((t) => (t.length <= 3 ? t.toUpperCase() : t))
      .join(" ");
    return {
      answer: topic
        ? `He hasn't written about ${topic} yet — his current articles are about event operations, community logistics, and career/operations parallels.`
        : "He's published a few pieces so far, mostly about operations and leadership through real situations he's worked through.",
      grounded: true,
      sources: [],
      links: allArticleMatches().map((a) => ({ label: a.title, href: a.href })),
    };
  }
  const top = matches.slice(0, 3);
  const answer = top.length === 1
    ? `Yes — "${top[0].title}." ${top[0].dek}`
    : `A few: ${top.map((a) => `"${a.title}"`).join(", ")}.`;
  return { answer, grounded: true, sources: top.map((a) => a.slug), links: top.map((a) => ({ label: a.title, href: a.href })) };
}

export function compose(
  classification: Classification,
  knowledge: Record<DomainId, DomainKnowledge>,
  lastAssistantText?: string
): AskResult {
  if (classification.isGreeting) {
    return { answer: `Hi — ask me anything about ${profile.name}'s background, work, or writing.`, grounded: true, sources: [], links: [] };
  }
  if (classification.isThanks) {
    return { answer: "Happy to help.", grounded: true, sources: [], links: [] };
  }
  if (classification.isCapability) {
    return {
      answer: "I can answer questions about Sahil's education, work experience, skills, projects, and what he's written — all grounded in what's actually on his profile.",
      grounded: true,
      sources: [],
      links: [],
    };
  }

  if (classification.isRelevanceFollowUp && classification.contextArticleSlug) {
    const article = allArticleMatches().find((a) => a.slug === classification.contextArticleSlug);
    if (article) {
      const bridge = knowledge.career.facts.find((f) => f.type === "interpretation")?.text;
      return {
        answer: join([
          `"${article.title}" is drawn directly from his own work, not a hypothetical — so it's a real example of the judgment he'd bring professionally.`,
          bridge,
        ]),
        grounded: true,
        sources: [article.slug],
        links: [{ label: article.title, href: article.href }],
      };
    }
  }

  if (classification.articleIntent) {
    return composeArticles(classification);
  }

  if (classification.temporal) {
    return composeTemporal(classification, knowledge);
  }

  if (classification.entity) {
    return composeEntity(classification.entity, classification.length, classification.subAngle);
  }

  if (classification.domain && classification.combineDomains && classification.secondDomain) {
    const pair = new Set([classification.domain, classification.secondDomain]);
    const perDomainLength = classification.length === "detailed" ? "normal" : "short";
    const a = composeDomain(knowledge[classification.domain], perDomainLength, null);
    const b = composeDomain(knowledge[classification.secondDomain], perDomainLength, null);
    // Only inject the bridge line when neither composed domain would
    // already surface it on its own — composeDomain(career, ...) already
    // includes this interpretation fact at "normal"/"detailed" length, so
    // adding it again here would duplicate the sentence.
    const bridge = pair.has("education") && pair.has("experience") && !pair.has("career")
      ? knowledge.career.facts.find((f) => f.type === "interpretation")?.text
      : undefined;
    return {
      answer: join([a.answer, b.answer, bridge]),
      grounded: a.grounded || b.grounded,
      sources: [...a.sources, ...b.sources],
      links: [...a.links, ...b.links],
    };
  }

  if (classification.domain) {
    const domainKnowledge = knowledge[classification.domain];
    const result = composeDomain(domainKnowledge, classification.length, classification.subAngle);

    const NEXT_STEP: Partial<Record<DomainId, string>> = {
      education: "He's also picked up a few certifications alongside his degrees.",
      experience: "A couple of these roles show up in more depth in his Insights articles.",
      businessManagement: "He writes about a lot of this in his Insights section.",
      accountingFinance: "His current work is operations-focused rather than accounting-focused, for what it's worth.",
    };
    const extra = result.grounded
      ? maybeNaturalFollowUp(NEXT_STEP[classification.domain] ?? null, classification.length, lastAssistantText)
      : "";
    return { ...result, answer: result.answer + extra };
  }

  if (classification.unresolvedTopic) {
    const topic = classification.unresolvedTopic
      .split(" ")
      .map((t) => (t.length <= 3 ? t.toUpperCase() : t))
      .join(" ");
    return {
      answer: `I don't have information about Sahil's ${topic} — it's not documented on his profile yet.`,
      grounded: false,
      sources: [],
      links: [],
    };
  }

  return { answer: FALLBACK_GENERIC, grounded: false, sources: [], links: [] };
}
