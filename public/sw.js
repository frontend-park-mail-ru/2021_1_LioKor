const KEY = 'liokor-mail-key'

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then( (cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {

                if (navigator.onLine) {
                    return fetch(event.request);
                }

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
            .catch((err) => {
                console.log(err.stack || err);
            })
    );
});
