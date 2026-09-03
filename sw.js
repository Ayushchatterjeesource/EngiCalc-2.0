const CACHE_NAME = 'engicalc-v1';
const urlsToCache = [
    '/EngiCalc-2.0/',
    '/EngiCalc-2.0/index.html',
    '/EngiCalc-2.0/style.css',
    '/EngiCalc-2.0/script.js',
    '/EngiCalc-2.0/engicalc2.0-logo.png',
    '/EngiCalc-2.0/manifest.json',
    '/EngiCalc-2.0/icon-192.png',
    '/EngiCalc-2.0/icon-512.png',
    '/EngiCalc-2.0/calculator/matrix.html',
    '/EngiCalc-2.0/calculator/vector.html',
    '/EngiCalc-2.0/calculator/complex.html',
    '/EngiCalc-2.0/calculator/ohms-law.html',
    '/EngiCalc-2.0/calculator/kirchhoff.html',
    '/EngiCalc-2.0/calculator/projectile.html',
    '/EngiCalc-2.0/calculator/unit-converter.html',
    '/EngiCalc-2.0/calculator/statistics.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
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
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
