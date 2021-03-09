import * as renderer from './renderer.js';

export default class Router {
    constructor() {
        window.addEventListener('popstate', (ev) => {
            const url = ev.state.url;
            if (url) {
                this.goto(url);
            }
        });

        this.resolvePaths = [
            { path: /^\/user\/.*\/password$/, renderPath: '/change_password' },
            { path: /^\/user\/.*/, renderPath: '/user_view' }
        ];

        this.prevUrl = null;
        this.linkedButtons = [];
        this.linkButtons();
    }

    linkButtons() {
        this.linkedButtons = document.querySelectorAll('linkButton');
        this.linkedButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                this.linksListener(event);
            });
        });
    }

    relinkButtons() {
        this.linkedButtons.forEach((button) => {
            button.outerHTML = button.outerHTML.toString();
            button.removeEventListener('click', (event) => {
                this.linksListener(event);
            });
        });
        this.linkButtons();
    }

    linksListener(event) {
        event.preventDefault();
        this.goto(event.currentTarget.getAttribute('href').toString());
    }

    goto(path) {
        history.pushState({ url: path }, '', path);
        this.resolvePaths.forEach((resolvePath) => {
            if (resolvePath.path.test(path)) {
                path = resolvePath.renderPath;
            }
        });
        renderer.render('body', path, this, () => { this.relinkButtons(); });
    }
}
