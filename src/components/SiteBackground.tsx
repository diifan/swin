import { memo } from 'react';
import { useReducedMotion } from 'motion/react';
import FloatingLines from './FloatingLines';
import WebGLBoundary from './WebGLBoundary';

const WAVES: Array<'top' | 'middle' | 'bottom'> = ['top', 'middle', 'bottom'];
const GRADIENT = ['#94a3b8', '#6f6f6f', '#6a6a6a'];

export default memo(function SiteBackground() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="site-background-fallback" />
      <WebGLBoundary fallback={null}>
          <FloatingLines
            enabledWaves={WAVES}
            lineCount={8}
            lineDistance={8}
            bendRadius={8}
            bendStrength={-2}
            interactive={!reduce}
            parallax={!reduce}
            animationSpeed={reduce ? 0 : 1}
            linesGradient={GRADIENT}
          />
      </WebGLBoundary>
    </div>
  );
});
