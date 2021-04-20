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
    console.log("Request:");
    console.log(event.request);
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                //console.log(" - success");
                if (navigator.onLine) {
                    return fetch(event.request); // get from network
                            /*.then(response => {
                                response.body.isLostLocation = false;
                                return response;
                            })
                            .catch(err => console.log(err.stack || err));*/
                }
                //window.dispatchEvent(new Event('offline')); // trigger window offline event

                if (cachedResponse) {
                    //cachedResponse.body.isLostConnection = true;
                    return cachedResponse; // get from cache
                }

                const init = {  // create empty response
                    status: 418,
                    statusText: 'Offline Mode'
                };
                const data = {message: 'Content is not available in offline mode'};
                const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
                return new Response(blob, init);
            })
            .catch((err) => {
                //console.log(" - error");
                console.log(err.stack || err);
            })
    );
});
