import { useEffect } from 'react';
import Markdown from 'react-markdown';
import privacy from '../../PRIVACY.md?raw';
import terms from '../../TERMS.md?raw';

export type LegalDocument = 'privacy' | 'terms';

export default function LegalPage({ document: kind }: { document: LegalDocument }) {
  const title = kind === 'terms' ? 'Terms of Use' : 'Privacy Policy';
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — SWIE | Swink AI Inc.`;
    return () => { document.title = previous; };
  }, [title]);

  return (
    <>
      <main id="main-content" tabIndex={-1} className="privacy-main">
        <p className="privacy-eyebrow">SWIE / SWINK AI INC. / LEGAL</p>
        <article className="privacy-copy">
          <Markdown skipHtml>{kind === 'terms' ? terms : privacy}</Markdown>
        </article>
        <a className="privacy-contact" href="mailto:hello@goswie.com">
          {kind === 'terms' ? 'Questions about these terms' : 'Contact us about your privacy'} ↗
        </a>
      </main>
    </>
  );
}
