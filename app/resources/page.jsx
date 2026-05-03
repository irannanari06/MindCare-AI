import { BookHeart, GraduationCap, MoonStar, PhoneCall, Shield, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";

const resources = [
  {
    icon: Shield,
    title: "Anxiety Help Tips",
    points: ["Try slow breathing with longer exhales.", "Write down the worry and one realistic next action.", "Talk to a trusted adult when worry feels too big."]
  },
  {
    icon: BookHeart,
    title: "Depression Support Tips",
    points: ["Keep routines small: water, food, light, and rest.", "Reach out to someone safe instead of staying alone with heavy feelings.", "Ask for professional support if sadness lasts or becomes intense."]
  },
  {
    icon: GraduationCap,
    title: "Study Stress Guide",
    points: ["Use short study blocks with breaks.", "Start with the easiest task to build momentum.", "Ask teachers or classmates for clarity early."]
  },
  {
    icon: MoonStar,
    title: "Better Sleep Guide",
    points: ["Dim screens before bed when possible.", "Keep a simple bedtime routine.", "Write tomorrow's first task on paper so your mind can rest."]
  }
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <SectionCard className="overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-violet-600 dark:text-sky-300">Resources + About</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Helpful mental health resources for students
            </h1>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-slate-700 dark:text-slate-300">
              These ideas are for emotional wellbeing and learning support. They do not diagnose conditions, prescribe medicine, or replace a therapist, counselor, doctor, or emergency service.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-gradient-to-br from-sky-500 to-violet-500 p-6 text-white shadow-glow">
            <PhoneCall size={28} />
            <h2 className="mt-5 text-2xl font-black">Emergency Helpline</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/85">
              Placeholder: Add your local school counselor number, emergency service, or trusted helpline here. In immediate danger, contact local emergency services now.
            </p>
          </div>
        </div>
      </SectionCard>

      <section className="grid gap-4 md:grid-cols-2">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <SectionCard key={resource.title}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/75 text-violet-600 dark:bg-white/10 dark:text-sky-200">
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-black text-slate-950 dark:text-white">{resource.title}</h2>
              </div>
              <ul className="space-y-3 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                {resource.points.map((point) => (
                  <li key={point} className="rounded-3xl bg-white/55 px-4 py-3 dark:bg-white/8">{point}</li>
                ))}
              </ul>
            </SectionCard>
          );
        })}
      </section>

      <SectionCard>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 text-white">
              <Sparkles size={22} />
            </div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">About MindCare AI</h2>
            <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-700 dark:text-slate-300">
              Created for AI Essentials using Gemini API, MindCare AI demonstrates how artificial intelligence can provide gentle wellness support, coping strategies, journaling encouragement, mood tracking, and resource discovery with no database required.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-white/65 p-5 text-sm font-black text-slate-700 dark:bg-white/10 dark:text-slate-200">
            Data stays in browser LocalStorage.
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
