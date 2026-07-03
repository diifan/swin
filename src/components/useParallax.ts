import { useScroll, useTransform, useMotionTemplate } from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { RefObject } from 'react';

export type ParallaxLayer = {
  scale: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  /** CSS filter string (e.g. "blur(8px)") driven by scroll 鈥?cinematic focus pull. */
  filter: MotionValue<string>;
};

/**
 * Cinematic depth-of-field transition between the two full-screen sections,
 * driven by the scroll progress of the <main> container (0 = section 1, 1 = section 2).
 *
 * Design intent: a "focus pull" 鈥?section 1 defocuses and recedes (scale + blur +
 * drift), section 2 re-focuses into place from an enlarged, blurred state. Layers
 * move at different rates / offset progress windows to build real z-depth.
 *
 * Everything is MotionValue-based so no React re-renders happen during scroll.
 */
export function useParallax(
  containerRef: RefObject<HTMLElement>,
  reduce: boolean,
): {
  heroBg: ParallaxLayer;
  heroContent: ParallaxLayer;
  pillarBg: ParallaxLayer;
  pillarContent: ParallaxLayer;
  progress: MotionValue<number>;
} {
  // progress: 0 at top (Hero), 1 at bottom (Pillar)
  const { scrollYProgress } = useScroll({ container: containerRef });
  const progress = scrollYProgress;

  // 鈹€鈹€ Hero (section 1) defocuses + recedes as we scroll down (0 鈫?1) 鈹€鈹€
  const heroBgBlur = useTransform(progress, [0, 0.8], reduce ? [0, 0] : [0, 12]);
  const heroBg = {
    scale: useTransform(progress, [0, 1], reduce ? [1, 1] : [1, 1.25]),
    y: useTransform(progress, [0, 1], reduce ? [0, 0] : [0, -50]),
    opacity: useTransform(progress, [0, 1], [1, 1]),
    filter: useMotionTemplate`blur(${heroBgBlur}px)`,
  };

  const heroContentBlur = useTransform(progress, [0, 0.7], reduce ? [0, 0] : [0, 8]);
  const heroContent = {
    scale: useTransform(progress, [0, 1], reduce ? [1, 1] : [1, 0.82]),
    y: useTransform(progress, [0, 1], reduce ? [0, 0] : [0, -120]),
    opacity: useTransform(progress, [0, 0.8], reduce ? [1, 1] : [1, 0]),
    filter: useMotionTemplate`blur(${heroContentBlur}px)`,
  };

  // 鈹€鈹€ Pillar (section 2) re-focuses into place (0 鈫?1) 鈹€鈹€
  // Background: finishes its transform a touch earlier than the content for depth.
  const pillarBgBlur = useTransform(progress, [0, 0.8], reduce ? [0, 0] : [10, 0]);
  const pillarBg = {
    scale: useTransform(progress, [0, 0.8], reduce ? [1, 1] : [1.25, 1]),
    y: useTransform(progress, [0, 0.8], reduce ? [0, 0] : [80, 0]),
    opacity: useTransform(progress, [0, 1], [1, 1]),
    filter: useMotionTemplate`blur(${pillarBgBlur}px)`,
  };

  // Content: offset window so it arrives after the background begins to settle.
  const pillarContentBlur = useTransform(progress, [0.15, 0.7], reduce ? [0, 0] : [6, 0]);
  const pillarContent = {
    scale: useTransform(progress, [0, 1], [1, 1]),
    y: useTransform(progress, [0.15, 0.7], reduce ? [0, 0] : [250, 0]),
    opacity: useTransform(progress, [0.15, 0.6], reduce ? [1, 1] : [0, 1]),
    filter: useMotionTemplate`blur(${pillarContentBlur}px)`,
  };

  return { heroBg, heroContent, pillarBg, pillarContent, progress };
}
