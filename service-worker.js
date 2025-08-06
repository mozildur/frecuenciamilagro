const CACHE = 'fm-v1';
const ASSETS = ['/', '/index.html', '/manifest.json',
  '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))
);

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
    ).then(()=>self.clients.claim())
  )
);

self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)))
);
