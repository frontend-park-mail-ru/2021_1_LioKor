import ParsedDate from '../modules/date.js';

const html = `
<div class="table-columns fullheight p-l">
    <div class="table-column dialogues-column table-rows bg-transparent">
        <div class="header tool-dialogue table-columns">
            <linkbutton class="middle-avatar svg-button plus-button" href="/new_message" pointer-events="auto"><svg pointer-events="none" class="middle-avatar" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none"><path transform="scale(2.2), translate(-1,-1)"  fill-rule="evenodd" clip-rule="evenodd" d="M10 3.25c.41 0 .75.34.75.75v5.25H16a.75.75 0 010 1.5h-5.25V16a.75.75 0 01-1.5 0v-5.25H4a.75.75 0 010-1.5h5.25V4c0-.41.34-.75.75-.75z" fill="#F5F5F5"/></svg></linkbutton>
            <!--linkbutton href="/new_message" style="font-size: 40px; color: #818F9A;" class="svg-button">+</linkbutton-->
            <input class="find-input flex-filler" placeholder="Найти диалог" id="find-input">
            <svg class="svg-button" id="clear-find-button" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><g fill="none" fill-rule="evenodd"><path d="m0 0h24v24h-24z"/><path d="m12 10.5857864 4.7928932-4.79289318c.3905243-.39052429 1.0236893-.39052429 1.4142136 0s.3905243 1.02368927 0 1.41421356l-4.7928932 4.79289322 4.7928932 4.7928932c.3905243.3905243.3905243 1.0236893 0 1.4142136s-1.0236893.3905243-1.4142136 0l-4.7928932-4.7928932-4.79289322 4.7928932c-.39052429.3905243-1.02368927.3905243-1.41421356 0s-.39052429-1.0236893 0-1.4142136l4.79289318-4.7928932-4.79289318-4.79289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0z" fill="#8594A0" fill-rule="evenodd" clip-rule="evenodd"/></g></svg>
        </div>

        <ul class="table-rows dialogues-listing" id="dialogues">
        </ul>
    </div>

    <div class="table-column table-rows messages-column bg-transparent">
        <div class="header">
            <span class="text-1" id="dialogue-header-title"></span>
            <span class="text-3" id="dialogue-header-time" style="padding-left: 10px">Выберите диалог</span>
        </div>

        <div class="body flex-filler table-rows" id="messages-field">
            <div class="flex-filler"></div>
            <div class="center-text">
                <svg width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z" fill="#8594A0"></path></svg>
                <div class="message">
                    Выберите диалог <br>
                    или создайте новый
                </div>
            </div>
            <div class="flex-filler"></div>
        </div>

        <div class="footer messages-footer" id="messages-footer">
            <div class="table-rows fullwidth">
                <div class="table-row text-4 table-columns">
                    <span>Тема: </span>
                    <input class="theme-input flex-filler" id="theme-input" placeholder="Без темы">
                </div>
                <div class="table-row table-columns">
                    <!--div class="table-rows">
                        <div class="flex-filler"></div>
                        <svg class="svg-button" id="change-theme-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99A2AD"><g transform="scale(1.2)"><path d="M9.56 4.1h3.54a.9.9 0 110 1.8H9.6c-1 0-1.69 0-2.23.04-.52.05-.82.13-1.05.24a2.6 2.6 0 00-1.14 1.14c-.11.23-.2.53-.24 1.05-.04.54-.04 1.24-.04 2.23v3.8c0 1 0 1.69.04 2.23.05.52.13.82.24 1.05.25.49.65.89 1.14 1.14.23.11.53.2 1.05.24.54.04 1.24.04 2.23.04h3.8c1 0 1.69 0 2.23-.04.52-.05.82-.13 1.05-.24a2.6 2.6 0 001.14-1.14c.11-.23.2-.53.24-1.05.04-.54.04-1.24.04-2.23v-3.5a.9.9 0 111.8 0v3.54c0 .95 0 1.71-.05 2.33a4.5 4.5 0 01-.43 1.73 4.4 4.4 0 01-1.92 1.92 4.5 4.5 0 01-1.73.43c-.62.05-1.38.05-2.33.05H9.56c-.95 0-1.71 0-2.33-.05a4.5 4.5 0 01-1.73-.43 4.4 4.4 0 01-1.92-1.92 4.51 4.51 0 01-.43-1.73c-.05-.62-.05-1.38-.05-2.33v-3.88c0-.95 0-1.71.05-2.33.05-.64.16-1.2.43-1.73A4.4 4.4 0 015.5 4.58a4.51 4.51 0 011.73-.43c.62-.05 1.38-.05 2.33-.05z"/><path d="M19.12 3.33a1.1 1.1 0 111.56 1.55l-.35.35a.4.4 0 01-.57 0l-.99-.99a.4.4 0 010-.56l.35-.35zm-.6 2.57l-.42-.42c-.44-.44-.72-.42-1.13 0l-5.13 5.12c-1.95 1.96-3.19 3.89-2.76 4.32.43.43 2.37-.8 4.32-2.76l5.12-5.13c.44-.44.42-.72 0-1.13z"/></g></svg>
                    </div-->
                    <div class="message-input" id="message-input" tabindex="0" contenteditable="true" role="textbox" aria-multiline="true"></div>
                    <div class="table-rows">
                        <div class="flex-filler"></div>
                        <svg class="svg-button" id="attach-photo-button" xmlns="http://www.w3.org/2000/svg" height="35" width="35"><g transform="scale(1.3)" fill="none" stroke="#828a99" stroke-width="1.7"><path d="m14.134 3.65c.853 0 1.46.278 1.988.899.017.019.494.61.66.815.228.281.674.536.945.536h.41c2.419 0 3.863 1.563 3.863 4.05v5.85c0 2.241-2 4.2-4.273 4.2h-11.454c-2.267 0-4.223-1.953-4.223-4.2v-5.85c0-2.496 1.4-4.05 3.814-4.05h.409c.271 0 .717-.255.945-.536.166-.204.643-.796.66-.815.528-.621 1.135-.899 1.988-.899z"/><circle cx="12" cy="12" r="3.85"/></g></svg>
                    </div>
                    <div class="table-rows">
                        <div class="flex-filler"></div>
                        <svg class="svg-button" id="message-send-button" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path transform="scale(1.3)" d="m12.1 7.87v-3.47a1.32 1.32 0 0 1 2.17-1l8.94 7.6a1.32 1.32 0 0 1 .15 1.86l-.15.15-8.94 7.6a1.32 1.32 0 0 1 -2.17-1v-3.45c-4.68.11-8 1.09-9.89 2.87a1.15 1.15 0 0 1 -1.9-1.11c1.53-6.36 5.51-9.76 11.79-10.05zm1.8-2.42v4.2h-.9c-5.3 0-8.72 2.25-10.39 6.86 2.45-1.45 5.92-2.16 10.39-2.16h.9v4.2l7.71-6.55z" fill="#828a99"/></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// Vk-playlist svg:
// <svg class="svg-button" id="change-theme-button" viewBox="711 15 24 24" xmlns="http://www.w3.org/2000/svg" height="30" width="30"><g fill="none" fill-rule="evenodd"><path d="m711 15h24v24h-24z"/><path d="m712 31h7m-7-5h12m-12-5h17m-5 10h10m-5-5v10" stroke="#828a99" stroke-linecap="round" stroke-width="2"/></g></svg>
/**
 * Renders auth page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function source(element, app) {
    if (!app.storage.username) {
        await app.goto('/auth');
        return;
    }

    document.title = `${app.name} | Диалоги`;
    element.innerHTML = html;

    // --- HTML elements
    const dialoguePreviewsGroup = document.getElementById('dialogues');
    const dialogueHeader = document.getElementById('dialogue-header-title');
    const dialogueTime = document.getElementById('dialogue-header-time');

    const messagesField = document.getElementById('messages-field');
    const messagesFooter = document.getElementById('messages-footer');

    const findInput = document.getElementById('find-input');
    const themeInput = document.getElementById('theme-input');
    const messageInput = document.getElementById('message-input');
    // --- Big containers
    let dialogues = [];
    const messages = {};
    // --- 1 element containers
    const currentDialogue = {
        htmlId: undefined,
        realId: undefined,
        elem: dialoguePreviewsGroup,
        title: undefined,
        time: undefined,
        avatar: undefined,
        username: undefined
    }
    const lastMessage = {
        htmlId: undefined,
        realId: undefined,
        elem: undefined,
        blockId: undefined,
        username: undefined,
        title: undefined
    };
    // --- Handlebars templates
    const messageBlockInnerHTMLTemplate = Handlebars.compile(`
        <div class="message-block {{ side }}">
            <img src="{{ avatar }}" alt="avatar" class="middle-avatar">
            <div class="floatright text-4 p-m">{{ time }}</div>
            <div class="message-block-title">{{ title }}</div>
            <div class="message-block-body">
            {{#each body}}
                <div id="{{ @index }}" class="message-body">{{ this }}</div>
            {{/each}}
            </div>
        </div>`);

    const dialogueInnerHTMLTemplate = Handlebars.compile(`
        <img src="{{ avatar }}" alt="avatar" class="middle-avatar">
        <div class="floatright text-4">{{ time }}</div>
        <div class="dialogue-text">
            <div class="text-1">{{ title }}</div>
            <div class="dialogue-body text-2">{{ body }}</div>
        </div>`);
    // --- Get dialogues
    const response = await app.apiGet('/email/dialogues');
    if (!response.ok) {
        app.messageError('Сессия истекла', 'Обновите страницу');
        return;
    }
    dialogues = await response.json();

    // --- Draw dialogues
    dialogues.forEach((dialogue, htmlId) => {
        // check dialogue fields
        if (!dialogue.avatarUrl) {
            dialogue.avatarUrl = app.defaultAvatarUrl;
        }
        dialogue.time = (new ParsedDate(dialogue.time)).getShortDateString(); // convert DateTime format to string

        // create dialogue HTML-element
        const dialogueElem = document.createElement('li');
        dialogueElem.id = htmlId;
        dialogueElem.classList.add('listing-button');
        dialogueElem.innerHTML = dialogueInnerHTMLTemplate({
            avatar: dialogue.avatarUrl, time: dialogue.time, title: dialogue.username, body: dialogue.body});
        dialoguePreviewsGroup.appendChild(dialogueElem);

        // create Event-listener on dialogue element
        dialogueElem.addEventListener('click', async (event) => {
            messagesFooter.style.display = 'flex'; // show message input

            // get dialogue id
            const currentElem = event.currentTarget;
            if (currentElem.id === currentDialogue.htmlId) { return; }
            currentDialogue.htmlId = currentElem.id;

            currentDialogue.elem.classList.remove('active'); // "deactivate" previous dialogue
            currentDialogue.elem = currentElem;
            currentDialogue.elem.classList.add('active'); // "activate" current dialogue

            // update dialogue header
            const dialogue = dialogues[currentDialogue.htmlId]; // get dialogue data
            dialogueHeader.innerText = currentDialogue.title = dialogue.username;
            dialogueTime.innerText = currentDialogue.time = dialogue.time;

            // update currentDialogue data
            currentDialogue.realId = dialogue.id;
            currentDialogue.avatar = dialogue.avatarUrl;
            currentDialogue.username = dialogue.username;

            // get dialogue messages
            if (!messages[dialogue.username]) {
                const response = await app.apiGet(`/email/emails?with=${dialogue.username}`);
                if (!response.ok) {
                    app.messageError('Сессия истекла', 'или диалога нет. Обновите страницу');
                }
                messages[dialogue.username] = await response.json();
            }

            showDialogue(dialogue.username);
        });
    });

    // send message event-listener
    document.getElementById('message-send-button').addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.keyCode === 13) {
            sendMessage();
        }
    });

    document.getElementById('clear-find-button').addEventListener('click', (event) => {
        findInput.value = '';
    });


    /**
     * draw all dialogue messages
     */
    function showDialogue(username) {
        messagesField.innerHTML = '<div class="flex-filler"></div>'; // fill top
        messages[username].forEach((messageBlock, id) => {
            // create block of messages HTML-element
            const messageBlockElem = document.createElement('div');
            messageBlockElem.id = id;


            // render message on right or left side
            if (messageBlock.sender.toLowerCase() === `${app.storage.username}@liokor.ru`.toLowerCase()) {
                messageBlockElem.classList.add('message-block-full', 'right-block');
                messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate({
                    side: 'your', avatar: app.storage.avatar, time: messageBlock.time, title: messageBlock.title, body: messageBlock.body});
            } else {
                messageBlockElem.classList.add('message-block-full', 'left-block');
                messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate({
                    side: 'not-your', avatar: currentDialogue.avatar, time: messageBlock.time, title: messageBlock.title, body: [messageBlock.body]});
            }
            messagesField.appendChild(messageBlockElem);

            // update lastMessage data
            lastMessage.htmlId = 0;
            lastMessage.realId = messageBlock.id;
            lastMessage.elem = messageBlockElem;
            lastMessage.blockId = id;
            lastMessage.title = messageBlock.title;
            lastMessage.username = messageBlock.sender;
        });
        messagesField.scrollTop = messagesField.scrollHeight; // scroll to bottom
    }

    /**
     * Sends email
     */
    async function sendMessage() {
        // check inputs
        let currentTitle = themeInput.value;
        if (currentTitle === '') { currentTitle = 'Без темы'; }
        const message = messageInput.innerText;
        if (message === '') { return; }

        // send message request
        const response = await app.apiPost('/email', {
            recipient: currentDialogue.username,
            subject: currentTitle,
            body: message
        });
        if (!response.ok) {
            app.messageError('Сообщение не отправилось', 'проверьте подключение к интернету');
            return;
        }

        // clear input
        messageInput.innerText = '';

        // add message HTML-block
        if (lastMessage.username.toLowerCase() === `${app.storage.username}@liokor.ru`.toLowerCase() && lastMessage.title === currentTitle) {
            lastMessage.id += 1;
            lastMessage.elem.firstElementChild.innerHTML += `<div id="${lastMessage.id}" class="message-body">${message}</div>`;

            messages[currentDialogue.username][lastMessage.blockId].body.push(message);
        } else {
            // create new messages block HTML-element
            const messageBlockElem = document.createElement('div');
            messageBlockElem.id = lastMessage.blockId;
            messageBlockElem.classList.add('message-block-full', 'right-block');
            const datetime = new Date();
            const currentTime = datetime.getHours() + ':' + datetime.getMinutes();
            messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate({
                side: 'your', avatar: app.storage.avatar, time: currentTime, title: currentTitle, body: [message]});
            messagesField.appendChild(messageBlockElem);

            // update lastMessage data
            lastMessage.id = 0;
            lastMessage.blockId += 1;
            lastMessage.username = `${app.storage.username}@liokor.ru`;
            lastMessage.title = currentTitle;
            lastMessage.elem = messageBlockElem;

            // add block to messages list
            messages[currentDialogue.username].push({
                username: `${app.storage.username}@liokor.ru`,
                title: currentTitle,
                time: currentTime,
                body: [message]
            });
        }
        messagesField.scrollTop = messagesField.scrollHeight; // scroll to bottom
    }
}
