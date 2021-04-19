/**
 * Register Service Worker
 */
export function registerSW() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js', { scope: '/' })
				.then((registration) => {
					const data = {
						type: 'CACHE_URLS',
						payload: [
							location.href,
							...performance.getEntriesByType('resource').map((r) => r.name)
						]
					};

					if(registration.installing) {
						console.log('Service worker installing');
					} else if(registration.waiting) {
						console.log('Service worker installed');
					} else if(registration.active) {
						registration.active.postMessage(data);
						console.log('Service worker active');
					}
				})
				.catch((err) => console.log('SW registration FAIL:', err));
	} else {
		console.log('Service Workers are not supported in this browser');
	}
}