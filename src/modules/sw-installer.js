/**
 * Register Service Worker
 */
export async function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
            .then((registration) => {
                const data = {
                    type: 'CACHE_URLS',
                    payload: [
                        location.href,
                        ...performance.getEntriesByType('resource').map(({ name }) => name)
                    ]
                };

                const { installing, waiting, active } = registration;
                if (installing) {
                    installing.postMessage(data);
                    console.log('Service worker installing');
                } else if (waiting) {
                    waiting.postMessage(data);
                    console.log('Service worker installed');
                } else if (active) {
                    active.postMessage(data);
                    console.log('Service worker active');
                }
            })
            .catch((err) => console.log('SW registration FAIL:', err));
    } else {
        console.log('Service Workers are not supported in this browser');
    }
}
