// This is an empty service worker to prevent 404 errors in development.
// If you decide to implement full PWA functionality, you can add your logic here.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});
