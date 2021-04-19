const KEY = 'liokor-mail-key'

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then( (cache) => {
                    console.log("Cached: ", event.data.payload);
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
                    return fetch(event.request); // try to get from network
                }

                // There we lose internet connection
                // TODO: send message to app

                if (cachedResponse) {
                    return cachedResponse; // try to get from cache
                }

                return fetch(event.request); // return shit request
            })
            .catch((err) => {
                console.log(err.stack || err);
            })
    );
});