import { NextResponse } from "next/server";
import { answerLocally, buildRemoteContext, buildSystemPrompt, FALLBACK_ANSWER, type Turn } from "@/lib/ask-sahil";

export const runtime = "nodejs";

const MAX_HISTORY_TURNS = 8;

function parseHistory(raw: unknown): Turn[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m): m is Turn => typeof m?.text === "string" && (m.role === "user" || m.role === "assistant"))
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({ role: m.role, text: m.text.slice(0, 1000) }));
}

// Ask Sahil works with zero configuration: without ANTHROPIC_API_KEY set,
// every request is answered by the free, local, context-aware retrieval
// engine in `src/lib/ask-sahil.ts`. Set ANTHROPIC_API_KEY (and optionally
// ASK_SAHIL_MODEL) in your deployment environment to upgrade to full
// natural-language generation over the same verified, retrieval-scoped
// context — no frontend changes required, and the key is never sent to
// the browser. Either way, conversation history stays on the client and is
// resent each turn (this route is stateless) so follow-ups work in both modes.
export async function POST(request: Request) {
  let question = "";
  let history: Turn[] = [];
  try {
    const body = await request.json();
    question = typeof body?.question === "string" ? body.question.slice(0, 500) : "";
    history = parseHistory(body?.history);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!question.trim()) {
    return NextResponse.json({ answer: FALLBACK_ANSWER, grounded: false, links: [], mode: "local" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const result = answerLocally(question, history);
    return NextResponse.json({ ...result, mode: "local" });
  }

  try {
    // Retrieval-first: only the facts relevant to this question (plus a
    // small identity fallback) go into the prompt, not the entire profile.
    const context = buildRemoteContext(question, history);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ASK_SAHIL_MODEL || "claude-sonnet-5",
        max_tokens: 400,
        system: buildSystemPrompt(context),
        messages: [
          ...history.map((t) => ({ role: t.role, content: t.text })),
          { role: "user", content: question },
        ],
      }),
    });

    if (!res.ok) throw new Error(`Upstream error ${res.status}`);

    const data = await res.json();
    const answer: string = data?.content?.[0]?.text?.trim() || FALLBACK_ANSWER;
    return NextResponse.json({ answer, grounded: true, links: [], mode: "remote" });
  } catch {
    // Any upstream failure degrades gracefully to the free local engine
    // rather than surfacing an error to the visitor.
    const result = answerLocally(question, history);
    return NextResponse.json({ ...result, mode: "local-fallback" });
  }
}
