const links = ['platform', 'solutions', 'company', 'support'] as const;

export default function Nav({ onLogoClick }: { onLogoClick?: () => void }) {
  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            onLogoClick?.();
          }}
          className="pointer-events-auto inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-zinc-950/70 px-3.5 text-xs font-semibold text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors duration-200 hover:border-white/25 sm:px-4"
        >
          <span className="grid h-4 w-4 grid-cols-2 gap-0.5" aria-hidden="true">
            <span className="rounded-[2px] bg-white" />
            <span className="rounded-[2px] bg-white/55" />
            <span className="rounded-[2px] bg-white/55" />
            <span className="rounded-[2px] bg-white" />
          </span>
          <span className="whitespace-nowrap">Swink AI Inc.</span>
        </a>

        <div className="pointer-events-auto hidden h-11 items-center gap-1 rounded-full border border-white/10 bg-zinc-950/70 px-3 text-xs font-medium text-zinc-300 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl md:flex">
          {links.map(label => (
            <a
              key={label}
              href="#"
              className="rounded-full px-4 py-2 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="pointer-events-auto hidden h-11 items-center justify-center rounded-full bg-white px-5 text-xs font-bold text-black shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
        >
          Join waitlist
        </a>
      </div>
    </nav>
  );
}
