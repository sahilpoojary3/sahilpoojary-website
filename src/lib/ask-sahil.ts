import { buildKnowledgeBase, type KnowledgeChunk } from "./knowledge-base";
import { profile } from "@/config/profile";

export const FALLBACK_ANSWER =
  "I don't have enough information on Sahil's profile to answer that. Try asking about his experience, education, certifications, skills, or how to get in touch.";

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "does", "do", "did", "what", "who",
  "where", "when", "why", "how", "of", "in", "on", "at", "for", "to", "and", "or",
  "about", "tell", "me", "his", "him", "he", "sahil", "poojary", "with", "can",
  "would", "be", "suitable", "please", "could", "you", "i", "it", "that", "this",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function scoreChunk(questionTokens: string[], chunk: KnowledgeChunk): number {
  const haystack = [...chunk.keywords, ...tokenize(chunk.text), ...tokenize(chunk.topic)];
  let score = 0;
  for (const token of questionTokens) {
    for (const word of haystack) {
      if (word === token) score += 3;
      else if (word.includes(token) || token.includes(word)) score += 1;
    }
  }
  return score;
}

export type AskResult = {
  answer: string;
  grounded: boolean;
  sources: string[];
};

// Deterministic, zero-cost retrieval over verified profile data. This is the
// default answer engine — no API key, no network call, cannot hallucinate
// because it only ever surfaces text that already exists in the knowledge base.
export function answerLocally(question: string): AskResult {
  const kb = buildKnowledgeBase();
  const tokens = tokenize(question);

  if (tokens.length === 0) {
    return { answer: FALLBACK_ANSWER, grounded: false, sources: [] };
  }

  const scored = kb
    .map((chunk) => ({ chunk, score: scoreChunk(tokens, chunk) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0 || scored[0].score < 3) {
    return { answer: FALLBACK_ANSWER, grounded: false, sources: [] };
  }

  const top = scored.slice(0, 3).map((s) => s.chunk);
  const answer = top.map((c) => c.text).join("\n\n");

  return { answer, grounded: true, sources: top.map((c) => c.id) };
}

export const SUGGESTED_QUESTIONS = [
  "What is Sahil's educational background?",
  "What kind of roles is Sahil interested in?",
  "Tell me about Sahil's marketing experience.",
  "What certifications does Sahil have?",
  "What languages does Sahil speak?",
  "Why would Sahil be suitable for a management role?",
];

export const SYSTEM_PROMPT = `You are "Ask Sahil", an assistant embedded on ${profile.name}'s personal website.
Answer ONLY using the context block provided below, which is sourced from Sahil's verified LinkedIn profile.
Never invent employment history, achievements, statistics, opinions, or qualifications that are not present in the context.
If the answer is not contained in the context, reply exactly with: "${FALLBACK_ANSWER}"
Keep answers concise (2-4 sentences), professional, and written in the third person about Sahil.`;
