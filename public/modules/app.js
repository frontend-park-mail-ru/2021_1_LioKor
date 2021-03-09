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

        document.body.addEventListener('click', (event) => {
            const targetElem = event.target;
            if (targetElem.tagName === "LINKBUTTON") {
                event.preventDefault();
                this.goto(event.target.getAttribute('href').toString());
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
    }

    async apiRequest(method, path, data = {}) {
        return await request(method, `${this.apiUrl}${path}`, data);
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
    }
}
