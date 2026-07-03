import { useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import PillarSection from './components/PillarSection';
import { useParallax } from './components/useParallax';

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const parallax = useParallax(mainRef, !!reduce);

  // Programmatic smooth scroll with a long, cinematic duration so the depth-of-field
  // transition is fully visible when triggered by the arrow buttons (the browser's
  // native "smooth" behaviour is far too quick, ~400ms).
  const scrollToSection = (index: number) => {
    const main = mainRef.current;
    if (!main) return;
    const target = main.children[index] as HTMLElement | undefined;
    if (!target) return;
    const start = main.scrollTop;
    const end = target.offsetTop;
    const distance = end - start;
    if (distance === 0) return;

    if (reduce) {
      main.scrollTop = end;
      return;
    }

    const duration = 1600; // ms 鈥?slow enough to read the focus-pull
    const startTime = performance.now();
    // easeInOutCubic for a deliberate, cinematic ease (not the snappy browser default).
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      main.scrollTop = start + distance * ease(t);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="h-[100dvh] overflow-hidden bg-black text-white">
      <Nav />
      <main ref={mainRef} className="h-[100dvh] overflow-y-scroll">
        <Hero parallax={parallax} onScrollNext={() => scrollToSection(1)} />
        <PillarSection parallax={parallax} onScrollPrev={() => scrollToSection(0)} />
      </main>

      {/* Page-change scrim: a darkening that peaks at the transition midpoint, reading
          as a deliberate "cut" between two pages rather than a continuous scroll. */}
      <Scrim progress={parallax.progress} />
    </div>
  );
}

function Scrim({ progress }: { progress: MotionValue<number> }) {
  // Transparent at both pages, ~0.6 in the middle 鈫?reads as a "cut" between pages.
  const opacity = useTransform(progress, [0, 0.5, 1], [0, 0.6, 0]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 bg-black"
      style={{ opacity }}
    />
  );
}
