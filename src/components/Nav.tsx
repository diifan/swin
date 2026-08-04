export default function Nav() {
  return (
    <>
      <nav
        className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+24px)] left-6 z-30 lg:bottom-[calc(env(safe-area-inset-bottom)+36px)] lg:left-[60px]"
        aria-label="Brand"
      >
        <p
          className="select-none text-[11px] font-light uppercase leading-none tracking-[1.5px] text-white/50"
          style={{ fontFamily: 'Inter, "Geist Variable", -apple-system, BlinkMacSystemFont, sans-serif' }}
          aria-label="Swink AI Inc."
        >
          &copy; Swink AI Inc.
        </p>
      </nav>

      <a
        href="mailto:hello@goswi.ai"
        className="pointer-events-auto fixed bottom-[calc(env(safe-area-inset-bottom)+24px)] right-6 z-30 inline-flex items-center gap-2 text-[11px] font-light leading-none tracking-[1.5px] text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 lg:bottom-[calc(env(safe-area-inset-bottom)+36px)] lg:right-[60px]"
        style={{ fontFamily: 'Inter, "Geist Variable", -apple-system, BlinkMacSystemFont, sans-serif' }}
        aria-label="Email Swink AI Inc. at hello@goswi.ai"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          className="size-3 shrink-0 stroke-current sm:size-[13px]"
          strokeWidth="1.25"
        >
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
          <path d="m2.25 4.25 5.12 4.08a1 1 0 0 0 1.26 0l5.12-4.08" />
        </svg>
        <span>hello@goswi.ai</span>
      </a>
    </>
  );
}
