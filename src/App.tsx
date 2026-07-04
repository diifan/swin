import { useRef } from 'react';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { useParallax } from './components/useParallax';

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const parallax = useParallax(mainRef, !!reduce);

  return (
    <div className="h-[100dvh] overflow-hidden bg-black text-white">
      <Nav />
      <main ref={mainRef} className="h-[100dvh] overflow-hidden">
        <Hero parallax={parallax} />
      </main>

      <Scrim progress={parallax.progress} />
    </div>
  );
}

function Scrim({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.5, 1], [0, 0.6, 0]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 bg-black"
      style={{ opacity }}
    />
  );
}
