// Runtime version check: the app's build version (__APP_VERSION__, injected at
// build time) is compared against /version.json, which is regenerated on every
// deploy. When they differ, a newer build is live, so we force-reload to fetch
// the latest index.html and its content-hashed assets. This lets long-open tabs
// and stale-cached clients pick up new deployments automatically instead of
// running an old bundle until they manually refresh.

const VERSION_URL = '/version.json';
const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

let reloading = false;

async function checkVersion(): Promise<void> {
  try {
    const res = await fetch(`${VERSION_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return;
    const data = (await res.json()) as { version?: string };
    if (typeof data.version === 'string' && data.version !== __APP_VERSION__) {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    }
  } catch {
    // Transient network/parse error — retry on the next tick.
  }
}

export function setupVersionCheck(): void {
  if (typeof window === 'undefined') return;
  // Re-check when the user returns to the tab.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void checkVersion();
  });
  // Re-check when connectivity is restored.
  window.addEventListener('online', () => void checkVersion());
  // Periodic check for long-open background tabs.
  window.setInterval(() => void checkVersion(), POLL_INTERVAL_MS);
}
