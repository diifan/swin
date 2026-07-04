export default function Nav() {
  return (
    <nav
      className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+24px)] left-6 z-30 lg:bottom-[calc(env(safe-area-inset-bottom)+36px)] lg:left-[60px]"
      aria-label="Brand"
    >
      <p
        className="select-none text-[11px] font-light uppercase leading-none tracking-[3px] text-white/50"
        style={{ fontFamily: 'Inter, "Geist Variable", -apple-system, BlinkMacSystemFont, sans-serif' }}
        aria-label="Swink AI Inc."
      >
        &copy; Swink AI Inc.
      </p>
    </nav>
  );
}
