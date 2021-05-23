import Handlebars from 'handlebars/dist/cjs/handlebars';

import '../styles/modal.styl';

const modalHTML = `
<span class="close-btn close">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
    </svg>
</span>

<div class="form-content">
    <div class="title">
        <div class="primary">{{ question }}</div>
    </div>

    {{#if prompt }}
        <div class="form-group">
            <input type="text" class="form-control input">
        </div>
    {{/if}}

    <div class="form-group flex">
        {{#if prompt }}
            <button class="btn submit w-75">Ок</button>
        {{else}}
            <button class="btn submit w-50 m-1">Да</button>
            <button class="btn btn-danger close w-50 m-1">Нет</button>
        {{/if}}
    </div>
</div>
`;
export default class Modal {
    constructor() {
        this.modalTemplate = Handlebars.compile(modalHTML);
    }

    async __createModal(question, prompt = false) {
        return new Promise((resolve) => {
            const background = document.createElement('div');
            background.classList.add('modal-background');
            const modal = document.createElement('div');
            modal.classList.add('standalone-form');
            modal.classList.add('modal');
            modal.innerHTML = this.modalTemplate({
                prompt: prompt,
                question: question,
            });
            background.appendChild(modal);

            const input = modal.querySelector('.input');

            const submitBtn = modal.querySelector('.btn.submit');
            const submitClick = () => {
                background.remove();
                resolve((input) ? input.value : true);
                submitBtn.removeEventListener('click', submitClick);
            }
            submitBtn.addEventListener('click', submitClick);

            const closeBtns = modal.querySelectorAll('.close');
            const closeClick = (ev) => {
                background.remove();
                resolve(false);
                ev.target.removeEventListener('click', closeClick);
            }
            for (const btn of closeBtns) {
                btn.addEventListener('click', closeClick);
            }

            document.body.prepend(background);
        });
    }

    async prompt(question) {
        return this.__createModal(question, true);
    }

    async confirm(question) {
        return this.__createModal(question, false);
    }
}
