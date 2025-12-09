// Versioning: Change this to invalidate old caches and force update
const CACHE_NAME = 'serhiienko-profile-v1.0';

// Assets that must be cached immediately for Offline capabilities
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/data.js',
    './js/qrcode.min.js',
    './manifest.json',
    './assets/images/photo.png',
    './assets/images/icon-192.png',
    // Fonts (Local)
    './assets/fonts/inter-v12-latin-300.woff2',
    './assets/fonts/inter-v12-latin-regular.woff2',
    './assets/fonts/inter-v12-latin-500.woff2',
    './assets/fonts/inter-v12-latin-600.woff2',
    './assets/fonts/playfair-display-v30-latin-600.woff2',
    './assets/fonts/playfair-display-v30-latin-600italic.woff2',
    './assets/fonts/playfair-display-v30-latin-700.woff2',
    './assets/fonts/great-vibes-v14-latin-regular.woff2'
];

// 1. Install Event: Cache core assets
self.addEventListener('install', (event) => {
    console.log(' Installing Service Worker...', CACHE_NAME);
    event.waitUntil(
        caches.open(CACHE_NAME)
           .then((cache) => {
                console.log(' Pre-caching offline assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
           .then(() => self.skipWaiting()) // Force activation
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log(' Activating Service Worker...');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key!== CACHE_NAME) {
                    console.log(' Removing old cache:', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim(); // Take control immediately
});

// 3. Fetch Event: Intercept network requests
self.addEventListener('fetch', (event) => {
    // Only handle GET requests, ignore POST/PUT etc.
    if (event.request.method!== 'GET') return;
    
    // Ignore chrome-extension schemes etc.
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Strategy: Cache First, falling back to Network
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request)
               .then((networkResponse) => {
                    // Check for valid response
                    if (!networkResponse |

| networkResponse.status!== 200 |
| networkResponse.type!== 'basic') {
                        return networkResponse;
                    }

                    // Clone response to cache it
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                })
               .catch(() => {
                    // Fallback logic could go here (e.g., return offline.html)
                    console.log(' Fetch failed, and not in cache.');
                });
        })
    );
});