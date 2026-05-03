"use client";

import { RefreshCw, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const quotes = [
  "Small steps still move you forward.",
  "You are allowed to pause and begin again.",
  "A calmer moment can start with one slow breath.",
  "Your feelings are real, and they can move through you.",
  "Progress can be quiet and still count.",
  "You do not have to solve everything today."
];

export function QuoteCard() {
  const initial = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return day % quotes.length;
  }, []);
  const [index, setIndex] = useState(initial);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-[2rem] p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white">
          <Quote size={20} />
        </div>
        <button
          type="button"
          aria-label="Generate another quote"
          title="Generate another quote"
          onClick={() => setIndex((current) => (current + 1) % quotes.length)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-slate-700 transition hover:scale-105 dark:bg-white/10 dark:text-slate-200"
        >
          <RefreshCw size={17} />
        </button>
      </div>
      <p className="text-xl font-black leading-snug text-slate-950 dark:text-white">"{quotes[index]}"</p>
      <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">Daily quote generator</p>
    </motion.div>
  );
}
