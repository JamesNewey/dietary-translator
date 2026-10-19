/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// The service worker that lets the app open without a connection.
// Create React App builds it from this file in production builds only; the list of the app's own
// files (self.__WB_MANIFEST) is filled in at build time.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Every file the build produces: scripts, styles, flags, the translations.
precacheAndRoute(self.__WB_MANIFEST);

// Any page visit is answered with the app itself, so it opens offline at any address.
// Static pages kept in public/ (with their own index.html) and files with an extension are left alone.
const fileExtension = /\/[^/?]+\.[^/]+$/;
registerRoute(
  ({ request, url }) =>
    request.mode === 'navigate' &&
    !url.pathname.startsWith('/_') &&
    !url.pathname.match(fileExtension) &&
    !url.pathname.startsWith('/design-taste-frontend'),
  createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`)
);

// The Switzer typeface: its stylesheet is checked for updates, the font files are kept for a year.
registerRoute(
  ({ url }) => url.origin === 'https://api.fontshare.com',
  new StaleWhileRevalidate({ cacheName: 'font-stylesheets' })
);
registerRoute(
  ({ url }) => url.origin === 'https://cdn.fontshare.com',
  new CacheFirst({
    cacheName: 'font-files',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }),
    ],
  })
);

// Files from public/ that the build doesn't list: the logo, favicon and manifest.
registerRoute(
  ({ url, request }) =>
    url.origin === self.location.origin && ['image', 'manifest'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'public-files',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

// A new version waits until every tab of the old one has closed, unless the page asks it to start now.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
