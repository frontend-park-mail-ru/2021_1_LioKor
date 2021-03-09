export function render(target, handler, router) {
    return new Promise((resolve, reject) => {
        const el = document.getElementById(target);
        try {
            el.style.opacity = '0%';

            // new page animation
            setTimeout(async () => {
                await handler(el, router);
                el.style.opacity = '100%';
                resolve();
            }, 200);
        } catch {
            el.innerHTML = 'Error occured while trying to render';
        };
    });
}
