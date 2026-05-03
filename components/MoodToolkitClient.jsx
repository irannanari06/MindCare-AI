"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlarmClock, BookOpenText, Brain, Flame, Heart, Leaf, Lightbulb, SmilePlus, TimerReset, Trash2 } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { useAppSettings } from "./AppProviders";

const moods = [
  { name: "Happy", color: "from-amber-300 to-orange-400" },
  { name: "Sad", color: "from-blue-300 to-sky-500" },
  { name: "Calm", color: "from-emerald-300 to-teal-500" },
  { name: "Angry", color: "from-rose-300 to-red-500" },
  { name: "Tired", color: "from-slate-300 to-slate-500" },
  { name: "Anxious", color: "from-violet-300 to-fuchsia-500" }
];

const affirmations = [
  "I can take this moment one breath at a time.",
  "My feelings matter, and I can ask for support.",
  "I am learning, growing, and doing my best.",
  "A difficult day does not define me."
];

const prompts = [
  "What emotion showed up most strongly today?",
  "What is one thing I handled better than I expected?",
  "What support would make tomorrow easier?",
  "What thought can I gently let go of tonight?"
];

const stressTips = ["Name five things you can see.", "Stretch your shoulders for ten seconds.", "Drink water slowly.", "Break one task into a tiny first step."];
const focusTips = ["Use a 20 minute timer.", "Keep only one tab or notebook open.", "Write the next action before starting.", "Put your phone across the room."];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function MoodToolkitClient() {
  const [history, setHistory] = useState([]);
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);
  const { playSoftTone } = useAppSettings();

  useEffect(() => {
    const saved = localStorage.getItem("mindcare-moods");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("mindcare-moods", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (!running) return undefined;
    if (seconds <= 0) {
      setRunning(false);
      playSoftTone();
      return undefined;
    }
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [running, seconds, playSoftTone]);

  const weekly = useMemo(() => history.slice(-7), [history]);
  const streak = useMemo(() => {
    const dates = new Set(history.map((entry) => entry.date));
    let count = 0;
    const cursor = new Date();
    while (dates.has(cursor.toISOString().slice(0, 10))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }, [history]);

  function saveMood(mood) {
    const entry = { mood, date: todayKey(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setHistory((current) => [entry, ...current.filter((item) => item.date !== entry.date)].slice(0, 30));
    playSoftTone();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-black text-slate-950 dark:text-white">Mood Tracker</h1>
              <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">Choose one mood each day and watch your pattern grow.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-black text-slate-700 dark:bg-white/10 dark:text-slate-200">
              <Flame size={17} className="text-orange-500" /> {streak} day streak
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {moods.map((mood) => (
              <button
                key={mood.name}
                type="button"
                onClick={() => saveMood(mood.name)}
                className={`rounded-[1.5rem] bg-gradient-to-br ${mood.color} p-4 text-left text-white shadow-sm transition hover:-translate-y-1`}
              >
                <SmilePlus size={22} />
                <span className="mt-8 block text-lg font-black">{mood.name}</span>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Weekly Progress</h2>
          <div className="mt-5 space-y-3">
            {weekly.length === 0 && <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">No moods saved yet. Pick today&apos;s mood to begin.</p>}
            {weekly.map((entry, index) => (
              <div key={`${entry.date}-${entry.mood}`} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-black text-slate-700 dark:text-slate-200">
                  <span>{entry.date}</span>
                  <span>{entry.mood}</span>
                </div>
                <div className="h-3 rounded-full bg-white/65 dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${100 - index * 8}%` }}
                    className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionCard>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Mood History</h2>
          <div className="soft-scrollbar mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
            {history.map((entry) => (
              <div key={`${entry.date}-${entry.time}`} className="flex items-center justify-between rounded-3xl bg-white/65 px-4 py-3 text-sm font-black text-slate-700 dark:bg-white/10 dark:text-slate-200">
                <span>{entry.mood}</span>
                <span className="text-slate-500 dark:text-slate-400">{entry.date} · {entry.time}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setHistory([])}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-slate-700 dark:bg-white/10 dark:text-slate-200"
          >
            <Trash2 size={15} /> Clear history
          </button>
        </SectionCard>

        <section className="grid gap-4 md:grid-cols-2">
          <ToolkitCard icon={AlarmClock} title="60 sec breathing exercise">
            <div className="flex items-center justify-between gap-4">
              <span className="text-5xl font-black text-slate-950 dark:text-white">{seconds}s</span>
              <button
                onClick={() => {
                  if (seconds === 0) setSeconds(60);
                  setRunning((value) => !value);
                }}
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"
              >
                {running ? "Pause" : "Start"}
              </button>
            </div>
            <button onClick={() => { setSeconds(60); setRunning(false); }} className="mt-3 inline-flex items-center gap-2 text-sm font-black text-slate-500 dark:text-slate-400">
              <TimerReset size={16} /> Reset timer
            </button>
          </ToolkitCard>

          <ToolkitCard icon={Heart} title="Positive affirmations">
            <p>{affirmations[affirmationIndex]}</p>
            <SmallNext onClick={() => setAffirmationIndex((value) => (value + 1) % affirmations.length)} />
          </ToolkitCard>

          <ToolkitCard icon={BookOpenText} title="Journaling prompts">
            <p>{prompts[promptIndex]}</p>
            <SmallNext onClick={() => setPromptIndex((value) => (value + 1) % prompts.length)} />
          </ToolkitCard>

          <ToolkitCard icon={Leaf} title="Stress relief tips">
            <ul className="space-y-2">
              {stressTips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </ToolkitCard>

          <ToolkitCard icon={Brain} title="Focus tips">
            <ul className="space-y-2">
              {focusTips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
          </ToolkitCard>

          <ToolkitCard icon={Lightbulb} title="Quick reset">
            <p>Inhale for four counts, exhale for six counts, then write one tiny next step.</p>
          </ToolkitCard>
        </section>
      </div>
    </div>
  );
}

function ToolkitCard({ icon: Icon, title, children }) {
  return (
    <SectionCard className="min-h-48">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/75 text-violet-600 dark:bg-white/10 dark:text-sky-200">
          <Icon size={20} />
        </div>
        <h3 className="text-base font-black text-slate-950 dark:text-white">{title}</h3>
      </div>
      <div className="text-sm font-bold leading-6 text-slate-650 text-slate-700 dark:text-slate-300">{children}</div>
    </SectionCard>
  );
}

function SmallNext({ onClick }) {
  return (
    <button onClick={onClick} className="mt-4 rounded-full bg-white/75 px-4 py-2 text-xs font-black text-slate-700 dark:bg-white/10 dark:text-slate-200">
      New one
    </button>
  );
}
