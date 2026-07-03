import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fonts via JS module imports (fontsource recommended path) 鈥?avoids Tailwind v4
// @import-order conflicts and keeps these CSS-only packages off the dep optimizer.
import '@fontsource-variable/geist/index.css';
import '@fontsource-variable/geist-mono/index.css';

import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
