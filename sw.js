// Service Worker to bypass cache on website update
const CACHE_NAME = 'raptor-v2-floating-hover';
const urlsToCache = ['/'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Skip caching - always fetch from network
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    // Always fetch from network, never cache HTML
    if (event.request.method === 'GET') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Don't cache HTML files
                    if (event.request.url.endsWith('.html') || event.request.url === '/') {
                        return response;
                    }
                    return response;
                })
                .catch(() => new Response('Offline'))
        );
    }
});
