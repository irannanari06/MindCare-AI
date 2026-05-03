import Link from "next/link";
import { ArrowRight, Brain, HeartHandshake, LineChart, ShieldCheck } from "lucide-react";
import { QuoteCard } from "@/components/QuoteCard";
import { SectionCard } from "@/components/SectionCard";

const features = [
  {
    icon: HeartHandshake,
    title: "Kind AI Chat",
    text: "Talk through stress, loneliness, focus struggles, or tough school days with supportive guidance."
  },
  {
    icon: LineChart,
    title: "Mood Tracking",
    text: "Save daily moods in your browser and notice weekly patterns without creating an account."
  },
  {
    icon: Brain,
    title: "Calming Toolkit",
    text: "Use breathing, journaling prompts, affirmations, focus tips, and stress relief tools."
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    text: "Clear crisis reminders and gentle encouragement to involve trusted people when things feel serious."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="grid min-h-[72vh] items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/55 px-4 py-2 text-sm font-bold text-sky-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-sky-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            AI Essentials Project
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Your AI Mental Wellness Companion
            </h1>
            <p className="max-w-2xl text-lg font-medium leading-8 text-slate-650 text-slate-700 dark:text-slate-300">
              MindCare AI offers gentle emotional support, simple coping ideas, mood tracking, and student-friendly resources in one calm place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
            >
              Start Chatting <ArrowRight size={18} />
            </Link>
            <Link
              href="/toolkit"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-6 py-3 text-sm font-black text-slate-800 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              Track Mood
            </Link>
          </div>
        </div>

        <SectionCard className="relative overflow-hidden">
          <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-sky-300/35 blur-2xl" />
          <div className="relative space-y-5">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-sky-500 to-violet-500 p-5 text-white shadow-glow">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/75">Today</p>
              <p className="mt-3 text-3xl font-black">Breathe. Reflect. Reset.</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/82">
                A supportive space for students to build healthier daily habits.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["60 sec calm", "Mood streak", "Daily quote", "Chat export"].map((item) => (
                <div key={item} className="rounded-3xl bg-white/62 p-4 text-sm font-black text-slate-800 dark:bg-white/10 dark:text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <SectionCard key={feature.title} className="transition hover:-translate-y-1">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 text-violet-600 dark:bg-white/10 dark:text-sky-200">
                <Icon size={22} />
              </div>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">{feature.title}</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">{feature.text}</p>
            </SectionCard>
          );
        })}
      </section>

      <QuoteCard />
    </div>
  );
}
