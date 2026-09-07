import { motion, useReducedMotion } from 'motion/react';

const typeIn = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const headlineVariant = reduce ? { hidden: {}, show: { opacity: 1 } } : typeIn;

  return (
    <section className="relative flex h-[100dvh] w-full shrink-0 items-center justify-center overflow-hidden">

      <motion.div className="pointer-events-none relative z-10 h-full w-full">
        <motion.div
          className="relative h-full w-full overflow-hidden px-5 pb-8 pt-24 sm:px-8 lg:px-10"
          initial={false}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
          }}
        >
          <motion.div
            variants={headlineVariant}
            className="launch-copy"
            aria-label="SWI is. Coming soon. Stay tuned."
          >
            <p className="launch-pretext">SWI is</p>
            <h1 className="launch-title">
              <span>Coming</span>
              <span>Soon</span>
            </h1>
            <p className="launch-subtext">Stay tuned</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
