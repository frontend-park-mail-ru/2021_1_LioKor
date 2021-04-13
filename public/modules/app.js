import * as renderer from './renderer.js';

import { request } from './requests.js';

import * as auth from '../pages/auth.html.js';
import * as user from '../pages/profile.html.js';
import * as signup from '../pages/signup.html.js';
import * as changePassword from '../pages/change_password.html.js';
import * as messages from '../pages/messages.html.js';

export default class App {
    constructor(name, apiUrl, elId, messagesElId = null) {
        this.storage = {
            username: null,
            avatar: '',
        }
        this.name = name;
        this.apiUrl = apiUrl;
        this.element = elId;

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
            // because handlebars is not imported but added as script:
            // eslint-disable-next-line
            this.messageTemplate = Handlebars.compile(messageHTML);
        }

        this.defaultAvatarUrl = '/images/default-avatar.jpg';

        window.addEventListener('popstate', (ev) => {
            const url = ev.state.url;
            if (url) {
                this.goto(url);
            }
        });

        document.body.addEventListener('click', (event) => {
            const targetElem = event.target;
            if (targetElem.tagName === 'LINKBUTTON') {
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
            },
            {
                urlRegex: /^\/messages$/,
                handler: messages.source
            },
        ];
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
            return;
        }
        await renderer.render(this.element, handler, this);
    }
}
