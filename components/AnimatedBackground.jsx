export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_top_left,#d8ecff_0,#f5f2ff_34%,#edf8ff_68%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_top_left,#1d2849_0,#171931_40%,#101426_100%)]">
      <div className="absolute left-[8%] top-20 h-72 w-72 animate-float rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-400/16" />
      <div className="absolute right-[12%] top-40 h-80 w-80 animate-pulseSoft rounded-full bg-violet-300/35 blur-3xl dark:bg-violet-400/18" />
      <div className="absolute bottom-[-5rem] left-[32%] h-96 w-96 animate-float rounded-full bg-sky-200/45 blur-3xl dark:bg-blue-500/12" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35 dark:opacity-10" />
    </div>
  );
}
