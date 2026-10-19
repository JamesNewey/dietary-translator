// Registers the service worker (src/service-worker.ts) so the app opens without a connection.
// Production builds only: in development (npm start) there is no service worker and nothing is cached.

export const register = () => {
  if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;

  // the worker has to come from the same origin as the page
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then((registration) => {
        registration.onupdatefound = () => {
          const worker = registration.installing;
          if (!worker) return;
          worker.onstatechange = () => {
            // a new version has downloaded while an older one runs this page: let it take over,
            // so the next visit gets the new version
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              worker.postMessage({ type: 'SKIP_WAITING' });
            }
          };
        };
      })
      .catch(() => {
        // no offline support this time; the app still works online
      });
  });
};

export const unregister = () => {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.ready.then((registration) => registration.unregister()).catch(() => {});
};
