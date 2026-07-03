export default function Nav() {
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30" aria-label="Brand">
      <div className="mx-auto flex max-w-[1400px] items-end px-5 pb-[calc(env(safe-area-inset-bottom)+1.9rem)] sm:px-8 sm:pb-[calc(env(safe-area-inset-bottom)+2rem)] lg:px-8">
        <p className="select-none font-mono text-[0.62rem] font-semibold leading-none tracking-[0.42em] text-white/38 sm:text-[0.68rem]">
          Swink AI Inc.
        </p>
      </div>
    </nav>
  );
}
