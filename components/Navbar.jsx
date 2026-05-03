"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, HeartPulse, Home, Moon, Sparkles, Sun, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useAppSettings } from "./AppProviders";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Chat", icon: Bot },
  { href: "/toolkit", label: "Mood + Toolkit", icon: HeartPulse },
  { href: "/resources", label: "Resources", icon: Sparkles }
];

export function Navbar() {
  const pathname = usePathname();
  const { darkMode, setDarkMode, soundOn, setSoundOn, playSoftTone } = useAppSettings();

  return (
    <header className="fixed left-0 right-0 top-0 z-30 px-4 py-4 sm:px-6">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2">
        <Link href="/" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-black tracking-tight text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-glow">
            <HeartPulse size={19} />
          </span>
          <span className="hidden sm:inline">MindCare AI</span>
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white sm:text-sm"
              >
                {active && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-full bg-white/75 shadow-sm dark:bg-white/12"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <Icon className="relative" size={16} />
                <span className="relative hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Toggle relaxing sound"
            title="Toggle relaxing sound"
            onClick={() => {
              setSoundOn(!soundOn);
              setTimeout(playSoftTone, 50);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-white/70 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            type="button"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-white/70 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
