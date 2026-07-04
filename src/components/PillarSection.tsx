import type { useParallax } from './useParallax';

type PillarSectionProps = {
  parallax: ReturnType<typeof useParallax>;
};

export default function PillarSection(_: PillarSectionProps) {
  return (
    <section className="relative flex h-[100dvh] w-full shrink-0 items-center justify-center overflow-hidden bg-black" />
  );
}
