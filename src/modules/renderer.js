const defaultBackground = 'linear-gradient(30deg, #153131 0%, #2e143c 60%, #5d4e25 100%)';

/**
 * Renders page with animation
 *
 * @param {object} target html element to render in
 * @param {object} handler function of a page (from .html.js)
 * @param {object} app object of a main App class
 * @param background
 * @param hasLogo
 * @returns {Promise} promise that will be resolved, when page is displayed
 */
export function render(target, handler, app, background, hasLogo = true) {
    return new Promise((resolve, reject) => {
        if (!background) {
            background = defaultBackground;
        }

        const bodyElement = document.querySelector('body');
        const logoElement = document.querySelector('header');
        bodyElement.style.background = background;
        logoElement.style.maxHeight = hasLogo ? '100px' : '0';
        const el = document.getElementById(target);
        try {
            el.style.opacity = 0;

            // new page animation
            setTimeout(async () => {
                handler(el, app);
                el.style.opacity = 1;
                resolve();
            }, 200);
        } catch {
            el.innerHTML = 'Error occured while trying to render';
            resolve();
        }
    });
}
