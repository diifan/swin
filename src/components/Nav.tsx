export default function Nav() {
  return (
    <nav
      className="pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+1.9rem)] left-5 z-30 sm:left-8 lg:bottom-[calc(env(safe-area-inset-bottom)+3rem)] lg:left-[4.5rem]"
      aria-label="Brand"
    >
      <p
        className="select-none text-[0.66rem] font-normal uppercase leading-none tracking-[0.36em] text-white/44 sm:text-[0.72rem]"
        style={{ fontFamily: '"Century Gothic", "AppleGothic", "Avenir Next", Arial, sans-serif' }}
        aria-label="Swink AI Inc."
      >
        &copy; Swink AI Inc.
      </p>
    </nav>
  );
}
