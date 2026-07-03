import type { useParallax } from './useParallax';

type PillarSectionProps = {
  parallax: ReturnType<typeof useParallax>;
  onScrollPrev: () => void;
};

export default function PillarSection({ onScrollPrev }: PillarSectionProps) {
  return (
    <section className="relative flex h-[100dvh] w-full shrink-0 items-center justify-center overflow-hidden bg-black">
      <button
        type="button"
        onClick={onScrollPrev}
        aria-label="Scroll to previous section"
        className="pointer-events-auto absolute bottom-8 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-white/60 hover:text-white"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </section>
  );
}
