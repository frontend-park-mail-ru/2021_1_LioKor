/**
 * Renders page with animation
 *
 * @param {object} target html element to render in
 * @param {object} handler function of a page (from .html.js)
 * @param {object} app object of a main App class
 * @returns {Promise} promise that will be resolved, when page is displayed
 */
export function render(target, handler, app) {
    return new Promise((resolve, reject) => {
        const el = document.getElementById(target);
        try {
            el.style.opacity = '0%';

            // new page animation
            setTimeout(async () => {
                handler(el, app);
                el.style.opacity = '100%';
                resolve();
            }, 200);
        } catch {
            el.innerHTML = 'Error occured while trying to render';
            resolve();
        }
    });
}
