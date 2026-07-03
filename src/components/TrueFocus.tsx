import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import './TrueFocus.css';

type TrueFocusProps = {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
};

type FocusRect = { x: number; y: number; width: number; height: number };

// -1 = "whole sentence locked" sentinel (frame wraps the entire phrase, no blur).
const WHOLE_SENTENCE = -1;

export default function TrueFocus({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
}: TrueFocusProps) {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 });

  // Auto-sweep through each word once, then lock onto the whole sentence and stop.
  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        // Already locked on the whole sentence 鈥?stop auto-advancing.
        // Only an explicit click (handleClick) should restart the sweep.
        if (prev === WHOLE_SENTENCE) {
          clearInterval(interval);
          return prev;
        }
        // After scanning the last word, settle on the whole-sentence lock.
        if (prev >= words.length - 1) {
          return WHOLE_SENTENCE;
        }
        return prev + 1;
      });
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length, replayKey]);

  // Track the active element's rect (a word, or the whole container when locked).
  useEffect(() => {
    if (!containerRef.current) return;

    if (currentIndex === WHOLE_SENTENCE) {
      // Frame the entire phrase.
      const rect = containerRef.current.getBoundingClientRect();
      setFocusRect({ x: 0, y: 0, width: rect.width, height: rect.height });
      return;
    }

    if (currentIndex < 0 || !wordRefs.current[currentIndex]) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  // Clicking the whole phrase replays the sweep from the first word.
  // Bumping replayKey re-triggers the auto-sweep effect (re-creating the interval),
  // which is needed because the interval self-clears when it locks.
  const handleClick = () => {
    if (manualMode) return;
    setCurrentIndex(0);
    setReplayKey(k => k + 1);
  };

  const frameStyle = {
    '--border-color': borderColor,
    '--glow-color': glowColor,
  } as CSSProperties;

  const locked = currentIndex === WHOLE_SENTENCE;

  return (
    <div
      className={`focus-container ${className}`}
      ref={containerRef}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        // When locked on the whole sentence, every word is sharp.
        const sharp = locked || isActive;
        return (
          <span
            key={index}
            ref={el => (wordRefs.current[index] = el)}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
            style={{
              filter: sharp ? 'blur(0px)' : `blur(${blurAmount}px)`,
              ...frameStyle,
              transition: `filter ${animationDuration}s ease`,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 || locked ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={frameStyle}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
}
