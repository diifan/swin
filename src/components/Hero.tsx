import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import CountUp from './CountUp';
import FloatingLines from './FloatingLines';
import Hyperspeed from './Hyperspeed';
import WebGLBoundary from './WebGLBoundary';

const HYPERSPEED_OPTIONS = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xffffff, 0xcbd5e1, 0x94a3b8],
    rightCars: [0xffffff, 0x94a3b8, 0x6a6a6a],
    sticks: 0x94a3b8,
  },
};

type Phase = 'road' | 'lines';

const typeIn = {
  hidden: { opacity: 0, y: 34, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduce ? 'lines' : 'road');

  const hyperspeedOptions = useMemo(() => HYPERSPEED_OPTIONS, []);

  const handleCountEnd = useCallback(() => {
    setTimeout(() => setPhase('lines'), 500);
  }, []);

  const headlineVariant = reduce ? { hidden: {}, show: { opacity: 1 } } : typeIn;

  return (
    <section className="relative flex h-[100dvh] w-full shrink-0 items-center justify-center overflow-hidden bg-black">
      <motion.div className="absolute inset-0 z-0">
        <WebGLBoundary>
          <AnimatePresence mode="sync">
            {phase === 'road' ? (
              <motion.div
                key="road"
                className="absolute inset-0"
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <Hyperspeed effectOptions={hyperspeedOptions} />
              </motion.div>
            ) : (
              <motion.div
                key="lines"
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <FloatingLines
                  enabledWaves={['top', 'middle', 'bottom']}
                  lineCount={8}
                  lineDistance={8}
                  bendRadius={8}
                  bendStrength={-2}
                  interactive={!reduce}
                  parallax={!reduce}
                  animationSpeed={reduce ? 0 : 1}
                  linesGradient={['#94a3b8', '#6f6f6f', '#6a6a6a']}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </WebGLBoundary>
      </motion.div>

      <motion.div className="pointer-events-none relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {phase === 'road' ? (
            <motion.div
              key="count"
              className="flex h-full w-full flex-col items-center justify-center px-6 text-center"
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="flex items-start font-bold leading-none tracking-tight text-white">
                <span className="text-7xl sm:text-8xl md:text-9xl">
                  <CountUp
                    from={0}
                    to={100}
                    separator=","
                    direction="up"
                    duration={1.5}
                    delay={0}
                    onEnd={handleCountEnd}
                  />
                </span>
                <span className="mt-2 text-3xl sm:text-4xl md:text-5xl">%</span>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-white/50"
              >
                Spooling up
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              className="relative h-full w-full overflow-hidden px-5 pb-8 pt-24 sm:px-8 lg:px-10"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
              }}
            >
              <motion.h1 variants={headlineVariant} className="launch-title" aria-label="Swink coming soon">
                <span>Swink</span>
                <span>coming soon</span>
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
