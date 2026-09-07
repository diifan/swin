import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import LegalPage from './components/LegalPage';
import SiteBackground from './components/SiteBackground';

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/';

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, window.location.href);
    const nextPath = normalizePath(url.pathname);
    if (url.origin !== window.location.origin || url.hash || !['/', '/terms', '/privacy'].includes(nextPath)) return;
    event.preventDefault();
    if (url.href !== window.location.href) window.history.pushState(null, '', url);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }));
  };
  const legalDocument = path === '/privacy' ? 'privacy' : path === '/terms' ? 'terms' : undefined;
  return (
    <div onClick={navigate} className={legalDocument ? 'privacy-page' : 'h-[100dvh] overflow-hidden bg-black text-white'}>
      <div className={`site-background${legalDocument ? ' site-background--subdued' : ''}`} aria-hidden="true">
        <SiteBackground />
      </div>
      <Nav activePage={legalDocument} />
      {legalDocument ? <LegalPage document={legalDocument} /> : <main id="main-content" tabIndex={-1} className="home-main relative z-10 h-[100dvh] overflow-hidden"><Hero /></main>}
    </div>
  );
}
