export default function Nav() {
  return (
    <nav
      className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+1.9rem)] left-5 z-30 sm:left-8 lg:bottom-[calc(env(safe-area-inset-bottom)+3rem)] lg:left-[4.5rem]"
      aria-label="Brand"
    >
      <p className="select-none font-mono text-[0.62rem] font-semibold leading-none tracking-[0.44em] text-white/36 sm:text-[0.68rem]">
        &copy; Swink AI Inc.
      </p>
    </nav>
  );
}
