import * as renderer from './renderer.js';

import { request } from './requests.js';

import * as auth from '../pages/auth.html.js';
import * as user from '../pages/profile_page.html.js';
import * as signup from '../pages/signup.html.js';
import * as changePassword from '../pages/change_password.html.js';

export default class App {
    constructor(name, apiUrl) {
        this.name = name;
        this.apiUrl = apiUrl;

        window.addEventListener('popstate', (ev) => {
            const url = ev.state.url;
            if (url) {
                this.goto(url);
            }
        });

        this.routes = [
            {
                urlRegex: /^\/auth$/,
                handler: auth.source
            },
            {
                urlRegex: /^\/signup$/,
                handler: signup.source
            },
            {
                urlRegex: /^\/user$/,
                handler: user.source
            },
            {
                urlRegex: /^\/user\/([A-Za-z0-9_]){1,}\/password$/,
                handler: changePassword.source
            }
        ];

        this.linkedButtons = [];
        this.linkButtons();
    }

    apiRequest(method, path, data = {}) {
        return request(method, `${this.apiUrl}${path}`, data);
    }

    apiGet(path, data = {}) {
        return this.apiRequest('GET', path, data);
    }

    apiPost(path, data = {}) {
        return this.apiRequest('POST', path, data);
    }

    apiPut(path, data = {}) {
        return this.apiRequest('PUT', path, data);
    }

    apiDelete(path, data = {}) {
        return this.apiRequest('DELETE', path, data);
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

    async goto(path) {
        history.pushState({ url: path }, '', path);

        let handler = null;
        for (const route of this.routes) {
            if (path.match(route.urlRegex)) {
                handler = route.handler;
                break;
            }
        }
        if (handler === null) {
            this.goto('/auth');
        }

        await renderer.render('body', handler, this);
        this.relinkButtons();
    }
}
