import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8'),
) as { version: string };

// Serves /version.json in dev and emits it to dist on build, so the running app
// can detect when a newer build has been deployed and force-reload stale tabs.
function versionManifest(): Plugin {
  const body = JSON.stringify({ version: pkg.version });
  return {
    name: 'version-manifest',
    configureServer(server) {
      server.middlewares.use('/version.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(body);
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'version.json', source: body });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), versionManifest()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
});
