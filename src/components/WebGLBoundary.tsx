import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode; fallback?: ReactNode };

type State = { hasError: boolean };

/**
 * Catches WebGL initialization failures (no GPU, hardware acceleration
 * disabled, headless without swiftshader). Renders a static fallback
 * background instead of crashing the whole page to a white screen.
 */
export default class WebGLBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('WebGL effect unavailable, using static fallback:', error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(216,86,191,0.12),transparent_60%)] bg-black" />
        )
      );
    }
    return this.props.children;
  }
}
