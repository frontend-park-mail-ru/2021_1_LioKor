import Handlebars from 'handlebars/dist/cjs/handlebars';

import '../styles/popupMessages.styl';

const messageHTML = `
<div class="popup-message {{ cls }}" id="{{ id }}">
    <div class="title"><strong>{{ title }}</strong></div>
    <div class="message">{{ message }}</div>
</div>
`;


export default class PopupMessages {
    constructor(el) {
        this.el = el;
        this.messageTemplate = Handlebars.compile(messageHTML);
        this.lastId = 1;
    }

    __message(title, message = '', success = true) {
        const dissapearAfterMs = 3000;
        const transitionTimeMs = 500;

        if (!this.el) {
            return;
        }

        const id = `popupMessage${this.lastId++}`;
        const cls = (success) ? 'success' : 'error';
        const messageRendered = this.messageTemplate({
            id,
            cls,
            title,
            message
        });
        this.el.innerHTML = messageRendered + this.el.innerHTML;

        setTimeout(() => {
            const messageEl = document.getElementById(id);
            messageEl.style.transitionDuration = `${transitionTimeMs}ms`;
            messageEl.style.opacity = '0';
            setTimeout(() => {
                messageEl.remove();
            }, transitionTimeMs);
        }, dissapearAfterMs);
    }

    success(title, message = '') {
        this.__message(title, message);
    }

    error(title, message = '') {
        this.__message(title, message, false);
    }
}
