import * as renderer from './modules/renderer';

import { request } from './modules/requests';
import PopupMessages from './modules/popupMessages';

import * as auth from './views/auth.html.js';
import * as user from './views/profile.html.js';
import * as signup from './views/signup.html.js';
import * as changePassword from './views/change_password.html.js';
import * as messages from './views/messages.html.js';
import * as view404 from './views/404.html.js';

const DEFAULT_AVATAR_URL = '/images/default-avatar.jpg';

export default class App {
    constructor(name, apiUrl, elId, messagesElId = null) {
        this.storage = {
            username: null,
            avatar: ''
        };

        this.name = name;
        this.apiUrl = apiUrl;
        this.element = elId;
        this.defaultAvatarUrl = DEFAULT_AVATAR_URL;

        this.messages = new PopupMessages();

        window.addEventListener('popstate', (ev) => {
            this.goto(location.pathname, false);
        });

        document.body.addEventListener('click', (event) => {
            const targetElem = event.target;
            if (targetElem.tagName === 'LINKBUTTON') {
                event.preventDefault();
                const href = event.target.getAttribute('href');
                if (href) {
                    this.goto(href);
                }
            }
        });

        this.routes = [
            {
                urlRegex: /^\/auth$/,
                handler: auth.handler,
                authRequired: false
            },
            {
                urlRegex: /^\/signup$/,
                handler: signup.handler,
                authRequired: false
            },
            {
                urlRegex: /^\/user$/,
                handler: user.handler,
                authRequired: true
            },
            {
                urlRegex: /^\/user\/([A-Za-z0-9_]){1,}\/password$/,
                handler: changePassword.handler,
                authRequired: true
            },
            {
                urlRegex: /^\/(\?.*)?$/,
                handler: messages.handler,
                authRequired: true
            }
        ];
    }

    updateStorage(username, avatarUrl = null) {
        this.storage.username = username;
        this.storage.avatar = (avatarUrl) ? `${this.apiUrl}/${avatarUrl}` : this.defaultAvatarUrl;
    }

    clearStorage() {
        this.storage.username = null;
        this.storage.avatar = null;
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

    getHandler(path) {
        for (const route of this.routes) {
            if (path.match(route.urlRegex)) {
                return {
                    handler: route.handler,
                    authRequired: route.authRequired
                };
            }
        }
        return {
            handler: null,
            authRequired: null
        };
    }

    async goto(path, pushState = true) {
        if (pushState) {
            history.pushState(null, null, path);
        }

        let { handler, authRequired } = this.getHandler(path);
        if (handler === null) {
            handler = view404.handler;
            authRequired = false;
        }

        if (authRequired && !this.storage.username) {
            this.goto('/auth');
            return;
        }

        await renderer.render(this.element, handler, this);
    }
}
