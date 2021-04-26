import Handlebars from 'handlebars/dist/cjs/handlebars';

import * as renderer from './renderer.js';

import { request } from './requests';

import * as auth from '../views/auth.html.js';
import * as user from '../views/profile.html.js';
import * as signup from '../views/signup.html.js';
import * as changePassword from '../views/change_password.html.js';
import * as messages from '../views/messages.html.js';
import * as view404 from '../views/404.html.js';

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

        this.messagesEl = null;
        this.messageTemplate = null;
        this.messageLastId = 1;
        if (messagesElId) {
            const messageHTML = `
            <div class="popup-message {{ cls }}" id="{{ id }}">
                <div class="title"><strong>{{ title }}</strong></div>
                <div class="message">{{ message }}</div>
            </div>`;
            this.messagesEl = document.getElementById(messagesElId);
            this.messageTemplate = Handlebars.compile(messageHTML);
        }

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
                handler: auth.handler
            },
            {
                urlRegex: /^\/signup$/,
                handler: signup.handler
            },
            {
                urlRegex: /^\/user$/,
                handler: user.handler
            },
            {
                urlRegex: /^\/user\/([A-Za-z0-9_]){1,}\/password$/,
                handler: changePassword.handler
            },
            {
                urlRegex: /^\/messages(\?with=.*)?$/,
                handler: messages.handler
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

    message(title, message = '', success = true) {
        const dissapearAfterMs = 3000;
        const transitionTimeMs = 500;

        if (!this.messagesEl) {
            return;
        }

        const id = `popupMessage${this.messageLastId++}`;
        const cls = (success) ? 'success' : 'error';
        const messageRendered = this.messageTemplate({
            id,
            cls,
            title,
            message
        });
        this.messagesEl.innerHTML = messageRendered + this.messagesEl.innerHTML;

        setTimeout(() => {
            const messageEl = document.getElementById(id);
            messageEl.style.transitionDuration = `${transitionTimeMs}ms`;
            messageEl.style.opacity = '0';
            setTimeout(() => {
                messageEl.remove();
            }, transitionTimeMs);
        }, dissapearAfterMs);
    }

    messageSuccess(title, message = '') {
        this.message(title, message);
    }

    messageError(title, message = '') {
        this.message(title, message, false);
    }

    getHandler(path) {
        for (const route of this.routes) {
            if (path.match(route.urlRegex)) {
                return route.handler;
            }
        }
        return null;
    }

    async goto(path, pushState = true) {
        if (pushState) {
            history.pushState(null, null, path);
        }

        let handler = this.getHandler(path);
        if (handler === null) {
            handler = view404.handler
        }

        await renderer.render(this.element, handler, this);
    }
}
