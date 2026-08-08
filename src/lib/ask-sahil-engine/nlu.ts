import type { Classification, DomainId, DomainKnowledge, EntityItem, SubAngle, Turn } from "./types";
import { searchArticles, findArticleByTitle, allArticleMatches } from "./articles";

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "does", "do", "did", "what", "who",
  "where", "when", "why", "how", "of", "in", "on", "at", "for", "to", "and", "or",
  "about", "tell", "me", "his", "him", "he", "sahil", "poojary", "with", "can",
  "would", "should", "be", "suitable", "please", "could", "you", "i", "it", "that", "this",
  "has", "have", "had", "s", "kind", "of",
]);

export function normalize(text: string): string {
  return text.toLowerCase().trim();
}

export function tokenize(text: string): string[] {
  return normalize(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function contentTokens(text: string): string[] {
  return tokenize(text).filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Word-boundary phrase matching — plain `.includes()` was matching "hi"
// inside "Sahil", "his", "him", "hire", which misfired the greeting
// detector on almost every real question about him. \b anchors the match
// to whole words (or whole word sequences for multi-word phrases).
function hasPhrase(normalizedText: string, phrase: string): boolean {
  const pattern = phrase.trim().split(/\s+/).map(escapeRegExp).join("\\s+");
  return new RegExp(`\\b${pattern}\\b`).test(normalizedText);
}

function hasAnyPhrase(normalizedText: string, phrases: string[]): boolean {
  return phrases.some((p) => hasPhrase(normalizedText, p));
}

const GREETINGS = ["hi", "hello", "hey", "yo", "good morning", "good afternoon", "good evening", "howdy"];
const THANKS = ["thanks", "thank you", "thx", "appreciate it", "cheers"];
const CAPABILITY_PHRASES = ["what can you", "what do you know", "what can i ask", "how do you work", "what are you"];
const EXPAND_PHRASES = ["tell me more", "more details", "go on", "continue", "expand", "say more", "more info", "elaborate"];
const COMPREHENSIVE_PHRASES = ["everything", "tell me all", "full picture", "in detail", "give me all", "comprehensive"];
const EXPLAIN_SIMPLE_PHRASES = ["explain", "what does that mean", "simplify", "in simple terms"];
const MIN_NORMAL_PHRASES = ["hire him", "why should", "suitable for", "kind of person"];
const RELEVANCE_PHRASES = [
  "relevant to his career", "relevant to her career", "relevant to his work",
  "how is that relevant", "why is that relevant", "why is this relevant",
  "important for his career", "matter for his career",
];
const CONNECTIVE_PHRASES = [
  "connect", "connects", "connecting", "connected",
  "relate", "relates", "relating", "related",
  "relationship between", "link", "links", "linking", "how does his",
];

// Phrase weights (word-boundary matched) plus single bare-word fallbacks
// (bag-of-words, lower weight) so rephrasings that don't hit an exact
// phrase — "what kind of work has he done" vs. "work history" — still
// route correctly. Phrases alone were too brittle on their own.
const DOMAIN_KEYWORDS: Record<DomainId, { phrase: string; weight: number }[]> = {
  identity: [
    { phrase: "who is", weight: 3 }, { phrase: "introduce", weight: 3 }, { phrase: "overview", weight: 2 },
    { phrase: "kind of person", weight: 4 }, { phrase: "background", weight: 1 }, { phrase: "headline", weight: 2 },
  ],
  education: [
    { phrase: "education", weight: 3 }, { phrase: "educational background", weight: 3 }, { phrase: "degree", weight: 3 },
    { phrase: "degrees", weight: 3 }, { phrase: "school", weight: 2 }, { phrase: "university", weight: 2 }, { phrase: "college", weight: 2 },
    { phrase: "study", weight: 2 }, { phrase: "studied", weight: 3 }, { phrase: "studying", weight: 2 }, { phrase: "academic", weight: 2 }, { phrase: "graduated", weight: 2 },
  ],
  experience: [
    { phrase: "experience", weight: 3 }, { phrase: "work history", weight: 3 }, { phrase: "job", weight: 2 }, { phrase: "jobs", weight: 2 },
    { phrase: "career history", weight: 3 }, { phrase: "worked", weight: 2 }, { phrase: "working", weight: 1 }, { phrase: "employment", weight: 2 },
    { phrase: "role", weight: 1 }, { phrase: "roles", weight: 1 }, { phrase: "work", weight: 1 },
  ],
  businessManagement: [
    { phrase: "business", weight: 2 }, { phrase: "businesses", weight: 2 }, { phrase: "management", weight: 2 }, { phrase: "operations", weight: 2 },
    { phrase: "strategy", weight: 2 }, { phrase: "industries", weight: 2 }, { phrase: "industry", weight: 2 },
    // Weak, generic fallback: a bare "what's he interested in?" with no
    // other signal defaults to professional interests rather than a hard
    // fallback — personal-hobby phrasing ("hobbies", "free time",
    // "painting") still routes to the interests domain via its own,
    // higher-weight keywords below.
    { phrase: "interested", weight: 1 }, { phrase: "interests", weight: 1 },
  ],
  accountingFinance: [
    { phrase: "accounting", weight: 4 }, { phrase: "accountant", weight: 4 }, { phrase: "finance", weight: 3 },
    { phrase: "financial", weight: 3 }, { phrase: "bookkeeping", weight: 3 },
  ],
  aiTechnology: [
    { phrase: "artificial intelligence", weight: 4 }, { phrase: "ai", weight: 3 }, { phrase: "technology", weight: 2 },
    { phrase: "tech", weight: 1 }, { phrase: "digital transformation", weight: 3 }, { phrase: "automation", weight: 2 },
    { phrase: "machine learning", weight: 3 },
  ],
  projects: [
    { phrase: "project", weight: 3 }, { phrase: "projects", weight: 3 }, { phrase: "initiative", weight: 2 }, { phrase: "case study", weight: 2 },
  ],
  writing: [
    { phrase: "write", weight: 3 }, { phrase: "written", weight: 3 }, { phrase: "writes", weight: 3 }, { phrase: "writing", weight: 3 },
    { phrase: "article", weight: 3 }, { phrase: "articles", weight: 3 }, { phrase: "blog", weight: 3 }, { phrase: "insights", weight: 2 }, { phrase: "published", weight: 2 },
  ],
  career: [
    { phrase: "hire him", weight: 4 }, { phrase: "hire", weight: 2 }, { phrase: "why should", weight: 3 }, { phrase: "suitable for", weight: 3 },
    { phrase: "career interests", weight: 4 }, { phrase: "career direction", weight: 4 }, { phrase: "career goals", weight: 4 }, { phrase: "career", weight: 1 },
    { phrase: "consulting", weight: 2 }, { phrase: "open to", weight: 2 },
  ],
  skills: [
    { phrase: "skill", weight: 3 }, { phrase: "skills", weight: 3 }, { phrase: "capable", weight: 2 }, { phrase: "good at", weight: 2 }, { phrase: "proficient", weight: 2 },
  ],
  certifications: [
    { phrase: "certification", weight: 4 }, { phrase: "certifications", weight: 4 }, { phrase: "certificate", weight: 4 }, { phrase: "certified", weight: 3 }, { phrase: "credential", weight: 3 },
  ],
  languages: [
    { phrase: "language", weight: 4 }, { phrase: "languages", weight: 4 }, { phrase: "speak", weight: 3 }, { phrase: "fluent", weight: 3 }, { phrase: "bilingual", weight: 3 },
  ],
  interests: [
    { phrase: "hobby", weight: 4 }, { phrase: "hobbies", weight: 4 }, { phrase: "beyond work", weight: 3 }, { phrase: "free time", weight: 3 },
    { phrase: "outside work", weight: 3 }, { phrase: "painting", weight: 3 }, { phrase: "sketch", weight: 3 }, { phrase: "outdoors", weight: 2 }, { phrase: "hiking", weight: 3 },
  ],
  recommendations: [
    { phrase: "recommend", weight: 3 }, { phrase: "recommendation", weight: 3 }, { phrase: "testimonial", weight: 3 }, { phrase: "reference", weight: 2 }, { phrase: "what do people say", weight: 3 },
  ],
  contact: [
    { phrase: "contact", weight: 3 }, { phrase: "email", weight: 3 }, { phrase: "reach him", weight: 3 }, { phrase: "linkedin", weight: 3 }, { phrase: "get in touch", weight: 3 },
  ],
};

function scoreDomains(question: string): { domain: DomainId; score: number }[] {
  const normalized = normalize(question);
  const results = (Object.keys(DOMAIN_KEYWORDS) as DomainId[]).map((domain) => {
    const score = DOMAIN_KEYWORDS[domain].reduce(
      (sum, { phrase, weight }) => (hasPhrase(normalized, phrase) ? sum + weight : sum),
      0
    );
    return { domain, score };
  });
  return results.filter((r) => r.score > 0).sort((a, b) => b.score - a.score);
}

function findEntity(question: string, knowledge: Record<DomainId, DomainKnowledge>): { domain: DomainId; entity: EntityItem } | null {
  const normalized = normalize(question);
  for (const domainId of ["education", "experience"] as DomainId[]) {
    for (const item of knowledge[domainId].items ?? []) {
      for (const alias of item.aliases) {
        if (hasPhrase(normalized, alias)) return { domain: domainId, entity: item };
      }
    }
  }
  return null;
}

const SUB_ANGLE_LEADS: { lead: string; angle: SubAngle }[] = [
  { lead: "where", angle: "where" },
  { lead: "when", angle: "when" },
  { lead: "why", angle: "why" },
  { lead: "who", angle: "who" },
];

function detectSubAngle(question: string): SubAngle {
  const trimmed = normalize(question).replace(/[?.!]+$/, "");
  for (const { lead, angle } of SUB_ANGLE_LEADS) {
    if (trimmed === lead || trimmed.startsWith(lead + " ")) return angle;
  }
  return null;
}

function detectTemporal(question: string): { direction: "before" | "after"; anchor: string | null } | null {
  const normalized = normalize(question);
  const padded = ` ${normalized} `;
  const direction: "before" | "after" | null = padded.includes(" before ")
    ? "before"
    : padded.includes(" after ")
      ? "after"
      : null;
  if (!direction) return null;
  const match = padded.match(/(?:before|after)\s+(?:his|her|the)?\s*([a-z0-9 ]{2,25})/);
  const anchorPhrase = match?.[1]?.trim().replace(/\bthat\b/g, "").trim() || null;
  return { direction, anchor: anchorPhrase && anchorPhrase.length > 1 ? anchorPhrase : null };
}

const ARTICLE_TRIGGER_WORDS = new Set(["write", "writes", "writing", "written", "article", "articles", "blog", "insights", "post", "posts", "published", "explain", "summarize"]);

function detectArticleIntent(question: string): { intent: "search" | "explain" | "synthesize"; terms: string[] } | null {
  const normalized = normalize(question);
  const isArticleTopic = hasAnyPhrase(normalized, ["article", "articles", "written", "write", "writes", "writing", "blog", "insights", "post", "posts", "published"]);
  if (!isArticleTopic) return null;

  const terms = contentTokens(question).filter((t) => !ARTICLE_TRIGGER_WORDS.has(t));

  if (hasAnyPhrase(normalized, ["main ideas", "themes", "across his articles", "overall", "in general does he write"])) {
    return { intent: "synthesize", terms: [] };
  }
  if (hasAnyPhrase(normalized, ["explain his article", "explain the article", "tell me about the article", "about his article", "summarize"])) {
    return { intent: "explain", terms };
  }
  // Indefinite phrasing ("one of his articles", "an article", "something
  // he's written") asks the bot to pick one, not to search for the literal
  // word "one" — terms deliberately empty so the composer picks the most
  // relevant/recent article instead of treating it as an unmatched search.
  if (hasAnyPhrase(normalized, ["one of his articles", "an article", "any article", "a piece he", "something he wrote", "something he has written", "something he's written"])) {
    return { intent: "explain", terms: [] };
  }
  return { intent: "search", terms };
}

function resolveArticleSlug(text: string): string | null {
  const ai = detectArticleIntent(text);
  if (!ai) return null;
  if (ai.terms.length === 0) {
    const all = allArticleMatches();
    return all[all.length - 1]?.slug ?? null;
  }
  const match = findArticleByTitle(ai.terms) ?? searchArticles(ai.terms)[0] ?? null;
  return match?.slug ?? null;
}

// Re-derives domain/entity for a single message without the full
// follow-up/expand machinery — used to look back through recent history
// when the current question is too short or referential to classify alone.
// Still carries a secondDomain hint so an "expand"/"tell me more" on a
// cross-domain question ("education and career") doesn't collapse back to
// a single domain on the follow-up turn.
function quickGuess(text: string, knowledge: Record<DomainId, DomainKnowledge>): { domain: DomainId | null; entity: EntityItem | null; secondDomain: DomainId | null } {
  const entityMatch = findEntity(text, knowledge);
  if (entityMatch) return { domain: entityMatch.domain, entity: entityMatch.entity, secondDomain: null };
  const scored = scoreDomains(text);
  const normalized = normalize(text);
  const isConnective = hasAnyPhrase(normalized, CONNECTIVE_PHRASES);
  const bothStrong = scored.length >= 2 && scored[0].score >= 3 && scored[1].score >= 3;
  const secondDomain = scored.length >= 2 && (isConnective || bothStrong) ? scored[1].domain : null;
  return { domain: scored[0]?.domain ?? null, entity: null, secondDomain };
}

export function classify(question: string, history: Turn[], knowledge: Record<DomainId, DomainKnowledge>): Classification {
  const normalized = normalize(question);
  const tokens = contentTokens(question);

  const isGreeting = hasAnyPhrase(normalized, GREETINGS) && tokens.length <= 3;
  const isThanks = hasAnyPhrase(normalized, THANKS);
  const isCapability = hasAnyPhrase(normalized, CAPABILITY_PHRASES);
  const isExpand = hasAnyPhrase(normalized, EXPAND_PHRASES) && !hasAnyPhrase(normalized, COMPREHENSIVE_PHRASES);
  const isComprehensive = hasAnyPhrase(normalized, COMPREHENSIVE_PHRASES);
  const isExplainSimple = hasAnyPhrase(normalized, EXPLAIN_SIMPLE_PHRASES) && tokens.length <= 4;

  const articleQuery = detectArticleIntent(question);
  const temporal = detectTemporal(question);
  const subAngle = detectSubAngle(question);

  const entityMatch = findEntity(question, knowledge);
  const domainScores = scoreDomains(question);

  const hasOwnSignal = !!entityMatch || domainScores.length > 0;
  const isShort = tokens.length <= 2;
  const isFollowUp = !hasOwnSignal && (isShort || subAngle !== null || temporal !== null);

  let domain: DomainId | null = entityMatch?.domain ?? domainScores[0]?.domain ?? null;
  let entity: EntityItem | null = entityMatch?.entity ?? null;
  let secondDomain: DomainId | null = domainScores[1]?.domain ?? null;
  let carriedSecondDomain: DomainId | null = null;
  let unresolvedTopic: string | null = null;

  if (!hasOwnSignal && isFollowUp) {
    // Walk backward through prior user turns to resolve "he/that/why/where" etc.
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].role !== "user") continue;
      const guess = quickGuess(history[i].text, knowledge);
      if (guess.domain) {
        domain = guess.domain;
        entity = guess.entity;
        carriedSecondDomain = guess.secondDomain;
        break;
      }
    }
  }

  // A genuinely context-free, content-word-free opener ("Tell me about
  // him", "Who is he?") has nothing to anchor to — default to a general
  // overview rather than a hard "I don't have information" wall. This only
  // fires when history resolution above found nothing, so an established
  // conversation still takes precedence.
  if (!domain && tokens.length === 0 && !articleQuery && !isGreeting && !isThanks && !isCapability) {
    domain = "identity";
  }

  if (!domain && !articleQuery && !isGreeting && !isThanks && !isCapability) {
    unresolvedTopic = tokens.slice(0, 4).join(" ") || null;
  }

  // Cross-domain / connective questions ("how does X connect to Y") warrant
  // retrieving from two domains and a longer answer. Require BOTH domains
  // to have a genuinely strong score (not just "second place by ratio") so
  // an incidental single-word overlap doesn't drag in an unrelated domain.
  const isConnective = hasAnyPhrase(normalized, CONNECTIVE_PHRASES);
  const bothStrong = !!secondDomain && domainScores[0].score >= 3 && domainScores[1].score >= 3;
  let combineDomains = !!secondDomain && (isConnective || bothStrong);
  if (!combineDomains) secondDomain = null;

  // "Tell me more" after a cross-domain question should still cover both
  // domains, not collapse to whichever scored first on the original
  // question — carry the second domain forward from the resolved turn.
  if (!combineDomains && carriedSecondDomain && domain) {
    secondDomain = carriedSecondDomain;
    combineDomains = true;
  }

  let length: Classification["length"] = "short";
  if (isComprehensive) length = "detailed";
  else if (isExpand) length = "detailed";
  else if (isExplainSimple) length = "short";
  else if (combineDomains) length = "normal";
  else if (hasAnyPhrase(normalized, MIN_NORMAL_PHRASES)) length = "normal";
  else if (tokens.length >= 8) length = "normal";

  const isRelevanceFollowUp = hasAnyPhrase(normalized, RELEVANCE_PHRASES);
  let contextArticleSlug: string | null = null;
  if (isRelevanceFollowUp) {
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].role !== "user") continue;
      const slug = resolveArticleSlug(history[i].text);
      if (slug) { contextArticleSlug = slug; break; }
    }
  }

  return {
    domain, secondDomain, combineDomains, entity, subAngle, length,
    isGreeting, isThanks, isCapability, isExpand, isExplainSimple, isFollowUp,
    unresolvedTopic,
    articleIntent: articleQuery?.intent ?? null,
    articleQueryTerms: articleQuery?.terms ?? [],
    temporal,
    isRelevanceFollowUp, contextArticleSlug,
  };
}
