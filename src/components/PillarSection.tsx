import { motion } from 'motion/react';
import LightPillar from './LightPillar';
import WebGLBoundary from './WebGLBoundary';
import type { useParallax } from './useParallax';

type PillarSectionProps = {
  parallax: ReturnType<typeof useParallax>;
  onScrollPrev: () => void;
};

export default function PillarSection({ parallax, onScrollPrev }: PillarSectionProps) {
  return (
    <section className="relative flex h-[100dvh] w-full shrink-0 items-center justify-center overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: parallax.pillarBg.scale, y: parallax.pillarBg.y, filter: parallax.pillarBg.filter }}
      >
        <WebGLBoundary>
          <LightPillar
            topColor="#f2f6fa"
            bottomColor="#94a3b8"
            intensity={0.72}
            rotationSpeed={0.4}
            glowAmount={0.0022}
            pillarWidth={8.8}
            pillarHeight={0.16}
            noiseIntensity={0.28}
            pillarRotation={18}
            interactive={false}
            mixBlendMode="normal"
            quality="high"
            className="opacity-95 brightness-110 contrast-125"
          />
        </WebGLBoundary>
      </motion.div>

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
