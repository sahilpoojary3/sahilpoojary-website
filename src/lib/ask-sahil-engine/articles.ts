import { insights, type InsightArticle } from "@/data/insights";
import type { ArticleMatch } from "./types";

// Word-boundary matching only — plain substring search matched "ai" inside
// "Rainstorm" and claimed an AI article existed when none does. That's
// exactly the kind of false-positive "hallucination via search" the bot
// must not produce.
function containsWord(haystack: string, term: string): boolean {
  if (term.length === 0) return false;
  return new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(haystack);
}

function flatten(article: InsightArticle): string {
  return article.content
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.text))
    .join(" ");
}

function toMatch(article: InsightArticle): ArticleMatch {
  return {
    slug: article.slug,
    title: article.title,
    dek: article.dek,
    category: article.category,
    href: `/insights/${article.slug}`,
    excerpt: article.dek,
  };
}

// Loose search across title, category, tags, and body — good enough for
// "what has he written about X" without needing embeddings.
export function searchArticles(queryTerms: string[]): ArticleMatch[] {
  if (queryTerms.length === 0) return [];
  const scored = insights.map((a) => {
    const haystack = [a.title, a.dek, a.category, ...a.tags, flatten(a)].join(" ").toLowerCase();
    let score = 0;
    for (const term of queryTerms) {
      if (containsWord(haystack, term)) score += term.length > 4 ? 2 : 1;
    }
    return { article: a, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => toMatch(s.article));
}

// Fuzzy title match for "explain his article about Y" / "tell me about the
// [title] article" style requests.
export function findArticleByTitle(queryTerms: string[]): ArticleMatch | null {
  if (queryTerms.length === 0) return null;
  let best: { article: InsightArticle; score: number } | null = null;
  for (const a of insights) {
    const titleWords = a.title.toLowerCase();
    const score = queryTerms.filter((t) => containsWord(titleWords, t)).length;
    if (score > 0 && (!best || score > best.score)) best = { article: a, score };
  }
  return best ? toMatch(best.article) : null;
}

// One takeaway per article — prefers the closing "what I learned"-style
// list if present, otherwise the dek. Used to synthesize across articles
// without dumping full text.
export function articleTakeaway(slug: string): string {
  const article = insights.find((a) => a.slug === slug);
  if (!article) return "";
  const list = [...article.content].reverse().find((b) => b.type === "list");
  if (list && list.type === "list") return list.items[0];
  return article.dek;
}

export function allArticleMatches(): ArticleMatch[] {
  return insights.map(toMatch);
}
