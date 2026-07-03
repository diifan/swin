export default function Nav({ onLogoClick }: { onLogoClick?: () => void }) {
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30">
      <div className="mx-auto flex max-w-[1400px] items-end px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:px-8 sm:pb-[calc(env(safe-area-inset-bottom)+1.5rem)] lg:px-10">
        <a
          href="#"
          onClick={e => {
            e.preventDefault();
            onLogoClick?.();
          }}
          className="pointer-events-auto inline-flex h-12 items-center gap-2.5 rounded-full border border-white/18 bg-zinc-950/55 px-4 text-sm font-semibold text-zinc-50 shadow-[0_16px_48px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition-colors duration-200 hover:border-white/32 sm:h-13 sm:px-5"
        >
          <span className="grid h-[18px] w-[18px] grid-cols-2 gap-1" aria-hidden="true">
            <span className="rounded-[2px] bg-white" />
            <span className="rounded-[2px] bg-white/55" />
            <span className="rounded-[2px] bg-white/55" />
            <span className="rounded-[2px] bg-white" />
          </span>
          <span className="whitespace-nowrap">Swink AI Inc.</span>
        </a>
      </div>
    </nav>
  );
}
