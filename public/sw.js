/**
 * Service Worker for Tab Errors Background Synchronization & Offline PWA Support
 * Handles offline caching, fetch interception, and background synchronization when connectivity is restored.
 */

const SW_VERSION = 'v1.1.0-tab-errors-sync';
const SYNC_TAG_ERRORS = 'sync-tab-errors';
const STATIC_CACHE_NAME = 'tab-errors-static-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.json'
];

// Service Worker Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    }).then(() => self.skipWaiting())
  );
});

// Service Worker Activation & Cache Cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercept fetch requests for network-first strategy with offline cache fallback
self.addEventListener('fetch', (event) => {
  // Only intercept GET requests for same-origin static assets or HTML
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip firestore or API calls (handled by Firebase SDK offline persistence)
  if (url.origin.includes('firestore.googleapis.com') || url.origin.includes('firebase')) {
    return;
  }

  // Skip Next.js internal chunks, HMR, and API endpoints
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});

// Background Synchronization Event
self.addEventListener('sync', (event) => {
  if (event.tag === SYNC_TAG_ERRORS || event.tag.startsWith('sync-tab-')) {
    console.log('[SW Background Sync] Handling sync event for tag:', event.tag);
    event.waitUntil(handleSyncTabErrors());
  }
});

// Broadcast sync command or notify all open windows/clients
async function handleSyncTabErrors() {
  const allClients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  
  // Notify open clients to process and flush their offline IndexedDB error queue to Firestore
  for (const client of allClients) {
    client.postMessage({
      type: 'FIREBASE_SW_BACKGROUND_SYNC_TRIGGERED',
      tag: SYNC_TAG_ERRORS,
      timestamp: Date.now()
    });
  }
}

// Listen for messages from client tabs
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data) return;

  if (data.type === 'PING_SW') {
    event.source?.postMessage({
      type: 'PONG_SW',
      version: SW_VERSION,
      timestamp: Date.now()
    });
  }

  if (data.type === 'QUEUE_TAB_ERROR_SYNC') {
    // Attempt registration of one-shot background sync if supported
    if ('sync' in self.registration) {
      self.registration.sync.register(SYNC_TAG_ERRORS).catch((err) => {
        console.warn('Service Worker sync register fallback:', err);
      });
    }
  }
});
