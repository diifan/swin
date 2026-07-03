import { motion, useReducedMotion } from 'motion/react';
import CardSwap, { Card } from './CardSwap';
import LightPillar from './LightPillar';
import WebGLBoundary from './WebGLBoundary';
import type { useParallax } from './useParallax';

type PillarSectionProps = {
  parallax: ReturnType<typeof useParallax>;
  onScrollPrev: () => void;
};

export default function PillarSection({ parallax, onScrollPrev }: PillarSectionProps) {
  const reduce = useReducedMotion();

  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative flex h-[100dvh] w-full shrink-0 items-center justify-center overflow-hidden bg-black">
      {/* LightPillar background 鈥?greyscale to match the wave palette */}
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

      {/* Left-aligned content layer */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        style={{ y: parallax.pillarContent.y, opacity: parallax.pillarContent.opacity, filter: parallax.pillarContent.filter }}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-6 lg:px-10"
      >
        {/* Text */}
        <div className="flex max-w-sm flex-col">
          <motion.h2
            variants={item}
            className="text-left text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            The next frontier
          </motion.h2>

          <motion.p
            variants={item}
            className="text-left text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Swink AI Inc. is crafting intelligent machines that perceive, move, and adapt. Scroll to explore what comes
            next.
          </motion.p>
        </div>

        {/* CardSwap (right side) */}
        <motion.div
          variants={item}
          className="pointer-events-auto relative hidden aspect-[16/10] w-[52%] max-w-[560px] translate-x-8 translate-y-6 shrink-0 self-center md:block lg:w-[55%] lg:translate-x-14 lg:translate-y-10"
        >
          <CardSwap width={540} height={338} cardDistance={55} verticalDistance={60} delay={3000} pauseOnHover={false}>
            <Card>
              <div className="flex h-full flex-col justify-between p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Perception</h3>
                <p className="text-lg font-medium text-white">Multimodal sensing for real-world understanding.</p>
              </div>
            </Card>
            <Card>
              <div className="flex h-full flex-col justify-between p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Locomotion</h3>
                <p className="text-lg font-medium text-white">Adaptive movement across any terrain.</p>
              </div>
            </Card>
            <Card>
              <div className="flex h-full flex-col justify-between p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Intelligence</h3>
                <p className="text-lg font-medium text-white">Embodied AI that learns from interaction.</p>
              </div>
            </Card>
          </CardSwap>
        </motion.div>
      </motion.div>

      {/* Scroll-to-prev arrow button */}
      <button
        type="button"
        onClick={onScrollPrev}
        aria-label="Scroll to previous section"
        className="pointer-events-auto absolute bottom-8 left-1/2 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-200 hover:border-white/60 hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </section>
  );
}
