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

self.addEventListener('fetch', (event) => {
    console.log("Fetch!");
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                console.log(" - success");
                if (navigator.onLine) {
                    let response = fetch(event.request); // get from network
                    //console.log("From network:");
                    //console.log(response);
                    response.isLostConnection = false;
                    //console.log(response);
                    return response;
                }

                if (cachedResponse) {
                    cachedResponse.isLostConnection = true;
                    return cachedResponse; // get from cache
                }


                let response = new Response(); // get empty response
                response.isLostConnection = true;
                return response;
            })
            .catch((err) => {
                console.log(" - error");
                console.log(err.stack || err);
            })
    );
});
