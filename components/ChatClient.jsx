"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Bot, Download, Loader2, Send, Sparkles, Trash2, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionCard } from "./SectionCard";
import { useAppSettings } from "./AppProviders";

const suggestions = ["I feel stressed", "I feel lonely", "I can't focus", "Help me calm down"];
const crisisPhrases = ["i want to die", "i want to hurt myself"];

const starterMessages = [
  {
    role: "assistant",
    text: "Hi, I am MindCare AI. I can listen, encourage you, and suggest simple coping steps. What is on your mind today?"
  }
];

function hasCrisisLanguage(text) {
  const normalized = text.toLowerCase();
  return crisisPhrases.some((phrase) => normalized.includes(phrase));
}

function getMoodContext() {
  try {
    const saved = localStorage.getItem("mindcare-moods");
    return saved ? JSON.parse(saved).slice(0, 7) : [];
  } catch (error) {
    return [];
  }
}

export function ChatClient() {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [crisisAlert, setCrisisAlert] = useState(false);
  const listRef = useRef(null);
  const { playSoftTone } = useAppSettings();

  useEffect(() => {
    const saved = localStorage.getItem("mindcare-chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("mindcare-chat", JSON.stringify(messages));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text = input) {
    const cleanText = text.trim();
    if (!cleanText || loading) return;

    const userMessage = { role: "user", text: cleanText };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    playSoftTone();

    if (hasCrisisLanguage(cleanText)) {
      setCrisisAlert(true);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I am really sorry you are feeling this much pain. Please contact a trusted person or emergency helpline immediately. If you are in immediate danger, call local emergency services now."
        }
      ]);
      return;
    }

    setCrisisAlert(false);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].slice(-10),
          moodHistory: getMoodContext()
        })
      });
      const data = await response.json();
      setMessages((current) => [
        ...current,
        { role: "assistant", text: data.reply || "I am here with you. Try one slow breath, then tell me a little more." }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: "assistant", text: "I could not reach the AI service right now. You can still pause, breathe slowly, and write one thing you need in this moment." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function exportChat() {
    const text = messages.map((message) => `${message.role.toUpperCase()}: ${message.text}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mindcare-chat.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
      <section className="space-y-5">
        <SectionCard>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white">
              <Bot size={23} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-950 dark:text-white">AI Wellness Chat</h1>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Kind support powered by Gemini</p>
            </div>
          </div>
          <p className="mt-5 rounded-3xl bg-sky-50/80 p-4 text-sm font-bold leading-6 text-slate-700 dark:bg-sky-400/10 dark:text-sky-100">
            This AI gives emotional support only and is not a replacement for professional help.
          </p>
        </SectionCard>

        <SectionCard>
          <h2 className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Suggested prompts</h2>
          <div className="grid gap-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="rounded-3xl bg-white/70 px-4 py-3 text-left text-sm font-black text-slate-800 transition hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard className="flex min-h-[72vh] flex-col p-4 sm:p-5">
        <AnimatePresence>
          {crisisAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 flex gap-3 rounded-3xl border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-400/40 dark:bg-red-500/12 dark:text-red-100"
            >
              <AlertTriangle className="mt-0.5 shrink-0" size={20} />
              <p className="text-sm font-black">Please contact a trusted person or emergency helpline immediately.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={listRef} className="soft-scrollbar flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((message, index) => {
            const isUser = message.role === "user";
            return (
              <motion.div
                key={`${message.role}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && <BubbleIcon icon={Bot} />}
                <div className={`max-w-[82%] rounded-[1.5rem] px-4 py-3 text-sm font-semibold leading-6 ${isUser ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "bg-white/80 text-slate-700 dark:bg-white/10 dark:text-slate-100"}`}>
                  {message.text}
                </div>
                {isUser && <BubbleIcon icon={UserRound} />}
              </motion.div>
            );
          })}
          {loading && (
            <div className="flex items-center gap-2 text-sm font-black text-slate-500 dark:text-slate-300">
              <Loader2 className="animate-spin" size={17} />
              MindCare AI is typing
              <span className="inline-flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:240ms]" />
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Share what you are feeling..."
            className="min-h-[52px] flex-1 resize-none rounded-[1.5rem] border border-white/60 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-sky-300/30 dark:border-white/10 dark:bg-white/10 dark:text-white"
          />
          <button
            type="button"
            aria-label="Send message"
            title="Send message"
            onClick={() => sendMessage()}
            className="flex h-[52px] min-h-[52px] w-[52px] min-w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-glow transition hover:scale-105"
          >
            <Send size={19} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={exportChat} className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-slate-700 dark:bg-white/10 dark:text-slate-200">
            <Download size={15} /> Export chat
          </button>
          <button
            onClick={() => {
              setMessages(starterMessages);
              setCrisisAlert(false);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-slate-700 dark:bg-white/10 dark:text-slate-200"
          >
            <Trash2 size={15} /> Clear
          </button>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 text-xs font-black text-slate-500 dark:bg-white/5 dark:text-slate-400">
            <Sparkles size={14} /> LocalStorage saved
          </span>
        </div>
      </SectionCard>
    </div>
  );
}

function BubbleIcon({ icon: Icon }) {
  return (
    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-violet-600 dark:bg-white/10 dark:text-sky-200 sm:flex">
      <Icon size={17} />
    </div>
  );
}
