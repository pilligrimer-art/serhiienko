/**
 * Service Worker for Prof. Dr. Olena Serhiienko Profile
 * 
 * Strategy: Cache-First with Network Fallback
 * - Provides offline functionality after first visit
 * - Automatically updates cache when new version is deployed
 * 
 * Version: 1.0.0
 * Last Updated: 2025-01-15
 */

// IMPORTANT: Change this version to force cache update on deployment
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `serhiienko-profile-${CACHE_VERSION}`;

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
    './assets/images/icon-512.png',
    
    // Local Fonts (GDPR Compliance)
    './assets/fonts/inter-v12-latin-300.woff2',
    './assets/fonts/inter-v12-latin-regular.woff2',
    './assets/fonts/inter-v12-latin-500.woff2',
    './assets/fonts/inter-v12-latin-600.woff2',
    './assets/fonts/playfair-display-v30-latin-600.woff2',
    './assets/fonts/playfair-display-v30-latin-600italic.woff2',
    './assets/fonts/playfair-display-v30-latin-700.woff2',
    './assets/fonts/great-vibes-v14-latin-regular.woff2'
];

// External CDN resources (cached separately)
const EXTERNAL_CACHE = 'external-resources';
const EXTERNAL_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// =========================================
// 1. Install Event: Pre-cache Core Assets
// =========================================
self.addEventListener('install', (event) => {
    console.log(`🔧 [SW] Installing version ${CACHE_VERSION}...`);
    
    event.waitUntil(
        Promise.all([
            // Cache local assets
            caches.open(CACHE_NAME).then((cache) => {
                console.log('📦 [SW] Caching core assets...');
                return cache.addAll(PRECACHE_ASSETS);
            }),
            
            // Cache external resources (non-blocking)
            caches.open(EXTERNAL_CACHE).then((cache) => {
                console.log('🌐 [SW] Caching external resources...');
                return cache.addAll(EXTERNAL_ASSETS).catch(err => {
                    console.warn('⚠️ [SW] Some external resources failed to cache:', err);
                });
            })
        ])
        .then(() => {
            console.log('✅ [SW] Installation complete!');
            return self.skipWaiting(); // Force activation immediately
        })
        .catch(err => {
            console.error('❌ [SW] Installation failed:', err);
        })
    );
});

// =========================================
// 2. Activate Event: Clean Up Old Caches
// =========================================
self.addEventListener('activate', (event) => {
    console.log('🚀 [SW] Activating new service worker...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Delete old versions of our cache
                    if (cacheName.startsWith('serhiienko-profile-') && cacheName !== CACHE_NAME) {
                        console.log('🗑️ [SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                    
                    // Keep EXTERNAL_CACHE unless we want to refresh it
                    // Uncomment below to force external cache refresh:
                    // if (cacheName === EXTERNAL_CACHE) {
                    //     return caches.delete(cacheName);
                    // }
                })
            );
        })
        .then(() => {
            console.log('✅ [SW] Activation complete. Taking control...');
            return self.clients.claim(); // Take control of all pages immediately
        })
    );
});

// =========================================
// 3. Fetch Event: Intercept Network Requests
// =========================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Only handle GET requests
    if (request.method !== 'GET') {
        console.log('⏭️ [SW] Ignoring non-GET request:', request.method, request.url);
        return;
    }
    
    // Ignore chrome-extension, devtools, etc.
    if (!request.url.startsWith('http')) {
        console.log('⏭️ [SW] Ignoring non-HTTP request:', request.url);
        return;
    }

    // Strategy: Cache-First with Network Fallback
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('💾 [SW] Serving from cache:', request.url);
                    
                    // Optional: Update cache in background (stale-while-revalidate)
                    updateCacheInBackground(request);
                    
                    return cachedResponse;
                }

                // Not in cache - fetch from network
                console.log('🌐 [SW] Fetching from network:', request.url);
                
                return fetch(request)
                    .then((networkResponse) => {
                        // Validate response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            console.log('⚠️ [SW] Invalid response, not caching:', request.url);
                            return networkResponse;
                        }

                        // Clone response before caching (response can only be consumed once)
                        const responseToCache = networkResponse.clone();
                        
                        // Cache dynamically fetched resources
                        caches.open(CACHE_NAME).then((cache) => {
                            console.log('💾 [SW] Caching new resource:', request.url);
                            cache.put(request, responseToCache);
                        });

                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('❌ [SW] Network fetch failed:', request.url, error);
                        
                        // Fallback logic for offline scenarios
                        return caches.match('./index.html').then(fallback => {
                            if (fallback) {
                                console.log('🆘 [SW] Serving offline fallback');
                                return fallback;
                            }
                            
                            // Last resort: generic offline response
                            return new Response(
                                '<html><body><h1>Offline</h1><p>No internet connection. Please try again later.</p></body></html>',
                                { 
                                    headers: { 'Content-Type': 'text/html' },
                                    status: 503,
                                    statusText: 'Service Unavailable'
                                }
                            );
                        });
                    });
            })
    );
});

// =========================================
// 4. Background Cache Update (Stale-While-Revalidate)
// =========================================
function updateCacheInBackground(request) {
    // Fetch latest version from network and update cache
    fetch(request)
        .then((response) => {
            if (!response || response.status !== 200) return;
            
            caches.open(CACHE_NAME).then((cache) => {
                console.log('🔄 [SW] Updating cache in background:', request.url);
                cache.put(request, response);
            });
        })
        .catch(() => {
            // Silent fail - we're already serving from cache
            console.log('⚠️ [SW] Background update failed (offline?):', request.url);
        });
}

// =========================================
// 5. Message Handler (Optional)
// =========================================
self.addEventListener('message', (event) => {
    console.log('📨 [SW] Received message:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('⏩ [SW] Skipping waiting...');
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        console.log('🗑️ [SW] Clearing all caches...');
        caches.keys().then(names => {
            return Promise.all(names.map(name => caches.delete(name)));
        }).then(() => {
            console.log('✅ [SW] All caches cleared!');
        });
    }
});

// =========================================
// 6. Push Notification Handler (Future Feature)
// =========================================
self.addEventListener('push', (event) => {
    console.log('🔔 [SW] Push notification received:', event.data);
    
    const options = {
        body: event.data ? event.data.text() : 'New update available!',
        icon: './assets/images/icon-192.png',
        badge: './assets/images/icon-192.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Prof. Dr. Olena Serhiienko', options)
    );
});

// =========================================
// 7. Notification Click Handler
// =========================================
self.addEventListener('notificationclick', (event) => {
    console.log('👆 [SW] Notification clicked:', event.notification.tag);
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log(`✅ [SW] Service Worker ${CACHE_VERSION} loaded successfully!`);