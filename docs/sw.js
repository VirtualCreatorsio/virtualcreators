// Service Worker for Virtualcreators website
const CACHE_NAME = 'virtualcreators-v1.1.0';
const STATIC_CACHE = 'static-v1.1.0';
const DYNAMIC_CACHE = 'dynamic-v1.1.0';
const IMAGE_CACHE = 'images-v1.1.0';
const FONT_CACHE = 'fonts-v1.1.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/styles.min.css',
  '/script.min.js',
  '/translations.min.js',
  '/cookie-banner.min.js',
  '/assets/vc-logo-32x32.png',
  '/assets/favicon-16x16.png',
  '/assets/apple-touch-icon.png'
];

// Install event - cache static files
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_FILES)),
      caches.open(IMAGE_CACHE),
      caches.open(FONT_CACHE)
    ]).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== IMAGE_CACHE && 
              cacheName !== FONT_CACHE
            )
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle external requests (fonts, etc.)
  if (url.origin !== location.origin) {
    // Cache external fonts
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      event.respondWith(
        caches.open(FONT_CACHE)
          .then(cache => cache.match(request))
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(request)
              .then(fetchResponse => {
                if (fetchResponse && fetchResponse.status === 200) {
                  const responseToCache = fetchResponse.clone();
                  caches.open(FONT_CACHE).then(cache => cache.put(request, responseToCache));
                }
                return fetchResponse;
              });
          })
      );
    }
    return;
  }

  // Determine cache strategy based on request type
  let cacheStrategy = DYNAMIC_CACHE;
  if (request.destination === 'image') {
    cacheStrategy = IMAGE_CACHE;
  } else if (request.destination === 'font') {
    cacheStrategy = FONT_CACHE;
  }

  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(request)
          .then(fetchResponse => {
            // Don't cache if not a valid response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            // Clone the response
            const responseToCache = fetchResponse.clone();

            // Cache with appropriate strategy
            caches.open(cacheStrategy)
              .then(cache => {
                cache.put(request, responseToCache);
              });

            return fetchResponse;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
