import Handlebars from 'handlebars/dist/cjs/handlebars';

import '../styles/popupMessages.styl';

const messageContentHTML = `
<div class="title"><strong>{{ title }}</strong></div>
<div class="message">{{ message }}</div>
`;

const DEFAULT_DISSAPPEAR_AFTER_MS = 3000;
const DEFAULT_TRANSITION_TIME_MS = 500;

export default class PopupMessages {
    constructor(dissappearAfterMs = DEFAULT_DISSAPPEAR_AFTER_MS, transitionTimeMs = DEFAULT_TRANSITION_TIME_MS) {
        this.el = document.createElement('div');
        this.el.classList.add('popup-messages');
        document.body.appendChild(this.el);

        this.messageContentTemplate = Handlebars.compile(messageContentHTML);

        this.dissappearAfterMs = dissappearAfterMs;
        this.transitionTimeMs = transitionTimeMs;
    }

    __createMessageEl(title, message, success) {
        const cls = (success) ? 'success' : 'error';

        const messageEl = document.createElement('div');
        messageEl.classList.add('popup-message');
        messageEl.classList.add(cls);
        messageEl.innerHTML = this.messageContentTemplate({ title, message });
        return messageEl;
    }

    __message(title, message = '', success = true) {
        const messageEl = this.__createMessageEl(title, message, success);
        this.el.appendChild(messageEl);

        setTimeout(() => {
            messageEl.style.transitionDuration = `${this.transitionTimeMs}ms`;
            messageEl.style.opacity = '0';
            setTimeout(() => {
                messageEl.remove();
            }, this.transitionTimeMs);
        }, this.dissappearAfterMs);
    }

    success(title, message = '') {
        this.__message(title, message);
    }

    error(title, message = '') {
        this.__message(title, message, false);
    }
}
