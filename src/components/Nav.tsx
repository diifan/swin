import type { LegalDocument } from './LegalPage';

export default function Nav({ activePage }: { activePage?: LegalDocument }) {
  return (
    <>
      <header className={`site-header${activePage ? ' site-header--privacy' : ''}`}>
        {activePage && (
          <a href="/" className="site-meta site-link site-home" aria-label="HOME">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="site-home-mark">
              <path d="M5.5 1.5h-4v4m9-4h4v4m0 5v4h-4m-5 0h-4v-4" />
              <path d="m8 5 3 3-3 3-3-3Z" />
            </svg>
            <span>HOME</span>
          </a>
        )}
        <nav className="site-legal-links" aria-label="Legal">
          <a href="/terms" className="site-meta site-link" aria-current={activePage === 'terms' ? 'page' : undefined}>TERMS</a>
          <a href="/privacy" className="site-meta site-link" aria-current={activePage === 'privacy' ? 'page' : undefined}>PRIVACY</a>
        </nav>
      </header>
      <footer className={`site-footer${activePage ? ' site-footer--privacy' : ''}`}>
      <nav
        className="pointer-events-none"
        aria-label="Brand"
      >
        <p
          className="site-meta select-none uppercase"
          aria-label="Swink AI Inc."
        >
          &copy; Swink AI Inc.
        </p>
      </nav>

      <a
        href="mailto:hello@goswie.com"
        className="site-meta site-link inline-flex items-center gap-2"
        aria-label="Email Swink AI Inc. at hello@goswie.com"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          className="size-3 shrink-0 stroke-current sm:size-[13px]"
          strokeWidth="1.25"
        >
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
          <path d="m2.25 4.25 5.12 4.08a1 1 0 0 0 1.26 0l5.12-4.08" />
        </svg>
        <span>hello@goswie.com</span>
      </a>
      </footer>
    </>
  );
}
