"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, User, RotateCcw } from "lucide-react";
import Link from "next/link";
import { profile } from "@/config/profile";
import { answerLocally, SUGGESTED_QUESTIONS } from "@/lib/ask-sahil";
import { ASK_SAHIL_OPEN_EVENT } from "@/lib/ask-sahil-events";

type Message = { role: "user" | "assistant"; text: string; links?: { label: string; href: string }[] };

const GREETING: Message = {
  role: "assistant",
  text: `Hi — I'm Ask ${profile.name.split(" ")[0]}. Ask me anything about his background, work, or writing.`,
};

export default function AskSahil() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(ASK_SAHIL_OPEN_EVENT, handler);
    return () => window.removeEventListener(ASK_SAHIL_OPEN_EVENT, handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function closeChat() {
    setOpen(false);
    openButtonRef.current?.focus();
  }

  // Keyboard users: Escape closes the dialog, focus moves into the input on
  // open and back to the launcher button on close, instead of getting lost.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function ask(question: string) {
    if (!question.trim() || loading) return;
    const history = messages.map(({ role, text }) => ({ role, text }));
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", text: data.answer, links: data.links }]);
    } catch {
      const local = answerLocally(question, history);
      setMessages((m) => [...m, { role: "assistant", text: local.answer, links: local.links }]);
    } finally {
      setLoading(false);
    }
  }

  function resetConversation() {
    setMessages([GREETING]);
    setInput("");
  }

  return (
    <>
      <motion.button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Ask Sahil chat"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-accent text-paper pl-4 pr-5 py-3.5 shadow-[0_12px_28px_-10px_var(--color-accent)]"
      >
        <Sparkles size={18} />
        <span className="text-sm font-medium hidden sm:inline">Ask Sahil</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Ask Sahil chat"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed z-50 bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[26rem] h-[85vh] sm:h-[34rem] bg-paper border border-line sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-paper-soft/60">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-paper">
                    <Sparkles size={14} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Ask Sahil</p>
                    <p className="text-[11px] text-ink-soft">Grounded in verified profile data</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={resetConversation}
                    aria-label="Start a new conversation"
                    title="Start a new conversation"
                    className="text-ink-soft hover:text-ink transition-colors p-1"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={closeChat}
                    aria-label="Close chat"
                    className="text-ink-soft hover:text-ink transition-colors p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                        m.role === "user" ? "bg-paper-soft text-ink-soft" : "bg-accent-soft text-accent"
                      }`}
                    >
                      {m.role === "user" ? <User size={13} /> : <Sparkles size={13} />}
                    </span>
                    <div className={`max-w-[80%] flex flex-col gap-1.5 ${m.role === "user" ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                          m.role === "user"
                            ? "bg-accent text-paper rounded-tr-sm"
                            : "bg-paper-soft text-ink rounded-tl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                      {!!m.links?.length && (
                        <div className="flex flex-wrap gap-1.5">
                          {m.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="text-[11px] rounded-full border border-line px-2.5 py-1 text-accent hover:border-accent transition-colors"
                            >
                              Read: {link.label} →
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Sparkles size={13} />
                    </span>
                    <div className="rounded-2xl rounded-tl-sm bg-paper-soft px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-ink-soft/50"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        className="text-xs text-left rounded-full border border-line px-3 py-1.5 text-ink-soft hover:border-accent hover:text-accent transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
                className="flex items-center gap-2 border-t border-line p-3"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Sahil's background..."
                  aria-label="Your question"
                  className="flex-1 bg-paper-soft rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-accent"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="inline-flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-accent text-paper disabled:opacity-40 transition-opacity"
                >
                  <Send size={15} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
