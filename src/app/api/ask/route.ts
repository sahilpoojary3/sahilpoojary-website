import { NextResponse } from "next/server";
import { buildKnowledgeBase } from "@/lib/knowledge-base";
import { answerLocally, FALLBACK_ANSWER, SYSTEM_PROMPT } from "@/lib/ask-sahil";

export const runtime = "nodejs";

// Ask Sahil works with zero configuration: without ANTHROPIC_API_KEY set,
// every request is answered by the free, local, grounded-retrieval engine
// in `src/lib/ask-sahil.ts`. Set ANTHROPIC_API_KEY (and optionally
// ASK_SAHIL_MODEL) in your deployment environment to upgrade to full
// natural-language answers from the same verified context — no frontend
// changes required, and the key is never sent to the browser.
export async function POST(request: Request) {
  let question = "";
  try {
    const body = await request.json();
    question = typeof body?.question === "string" ? body.question.slice(0, 500) : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!question.trim()) {
    return NextResponse.json({ answer: FALLBACK_ANSWER, grounded: false, mode: "local" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    const result = answerLocally(question);
    return NextResponse.json({ ...result, mode: "local" });
  }

  try {
    const context = buildKnowledgeBase()
      .map((c) => `[${c.topic}] ${c.text}`)
      .join("\n");

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
        system: `${SYSTEM_PROMPT}\n\nContext:\n${context}`,
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!res.ok) throw new Error(`Upstream error ${res.status}`);

    const data = await res.json();
    const answer: string = data?.content?.[0]?.text?.trim() || FALLBACK_ANSWER;
    return NextResponse.json({ answer, grounded: true, mode: "remote" });
  } catch {
    // Any upstream failure degrades gracefully to the free local engine
    // rather than surfacing an error to the visitor.
    const result = answerLocally(question);
    return NextResponse.json({ ...result, mode: "local-fallback" });
  }
}
