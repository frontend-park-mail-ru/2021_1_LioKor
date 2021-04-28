const KEY = 'liokor-mail-key';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then((cache) => {
                    // console.log("Cached: ", event.data.payload);
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') { return; }
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (navigator.onLine) {
                    return fetch(event.request) // get from network
                        .then(res => {
                            const resClone = res.clone();
                            caches.open(KEY).then((cache) => cache.put(event.request, resClone));
                            return res;
                        })
                        .catch(err => console.error(err));
                }

                if (event.request.url.includes('/messages?')) { // if we have query-parameters (but we need to get html-page)
                    return caches.match(event.request.url.split('?')[0]); // get cache from url without query
                }

                if (cachedResponse) {
                    return cachedResponse; // get from cache
                }

                const init = { // create empty response
                    status: 418,
                    statusText: 'Offline Mode'
                };
                const data = { message: 'Content is not available in offline mode' };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                return new Response(blob, init);
            })
            .catch((err) => {
                // console.log(" - error");
                console.log(err.stack || err);
            })
    );
});
