import ParsedDate from '../modules/date';

const html = `
<div class="table-columns fullheight p-l bg-5">
    <div class="table-column dialogues-column table-rows bg-transparent">
        <div class="header tool-dialogue table-columns">
            <div class="middle-avatar add-button" id="add-dialogue-button">
                <svg class="svg-button" xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path transform="scale(2.2) translate(-1,-1)" d="M10 3.25c.41 0 .75.34.75.75v5.25H16a.75.75 0 010 1.5h-5.25V16a.75.75 0 01-1.5 0v-5.25H4a.75.75 0 010-1.5h5.25V4c0-.41.34-.75.75-.75z" fill="#F5F5F5"/></svg>
                <svg class="svg-button" xmlns="http://www.w3.org/2000/svg" width="40" height="40"><g transform="scale(1.8) translate(2, -1)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g></svg>
            </div>
            <!--linkbutton href="/new_message" style="font-size: 40px; color: #818F9A;" class="svg-button">+</linkbutton-->
            <input class="find-input flex-filler" placeholder="Найти диалог" id="find-input">
            <svg class="svg-button transparent" id="clear-find-button" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 10.5857864 4.7928932-4.79289318c.3905243-.39052429 1.0236893-.39052429 1.4142136 0s.3905243 1.02368927 0 1.41421356l-4.7928932 4.79289322 4.7928932 4.7928932c.3905243.3905243.3905243 1.0236893 0 1.4142136s-1.0236893.3905243-1.4142136 0l-4.7928932-4.7928932-4.79289322 4.7928932c-.39052429.3905243-1.02368927.3905243-1.41421356 0s-.39052429-1.0236893 0-1.4142136l4.79289318-4.7928932-4.79289318-4.79289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0z"/></svg>
        </div>

        <ul class="table-rows dialogues-listing scrollable" id="dialogues">
        </ul>
    </div>

    <div class="table-column table-rows messages-column bg-transparent">
        <div class="header table-columns">
            <span class="text-1" id="dialogue-header-title"></span>
            <span class="text-3 flex-filler" id="dialogue-header-time" style="margin-left: 10px">Выберите диалог</span>
            <linkbutton class="svg-button" href="/user" pointer-events="auto"><svg pointer-events="none" id="clear-find-button" style="margin-right: 10px" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><g transform="scale(1.2)"><path d="m3.0000001 14.5c0-3.1424487 3.08132567-4.50000038 6.9999999-4.50000038 3.9186742 0 6.9999999 1.35755168 6.9999999 4.50000038 0 1.615596-1.0761803 2.5000004-2.3000001 2.5000004h-9.39999961c-1.22381984 0-2.30000009-.8844044-2.30000009-2.5000004zm1.8 0c0 .5349234.20087263.7000004.50000009.7000004h9.39999961c.2991275 0 .5000001-.165077.5000001-.7000004 0-1.7450508-2.1675128-2.7000004-5.1999999-2.7000004-3.03248714 0-5.1999999.9549496-5.1999999 2.7000004zm9.0999999-9.5c0 2.15455627-1.7454437 3.9-3.9 3.9-2.15455627 0-3.9-1.74544373-3.9-3.9s1.74544373-3.9 3.9-3.9c2.1545563 0 3.9 1.74544373 3.9 3.9zm-1.8 0c0-1.16044373-.9395563-2.1-2.1-2.1-1.16044373 0-2.1.93955627-2.1 2.1s.93955627 2.1 2.1 2.1c1.1604437 0 2.1-.93955627 2.1-2.1z"/></g></svg></linkbutton>
        </div>

        <div class="body flex-filler table-rows scrollable" id="messages-field">
            <div class="flex-filler"></div>
            <div class="center-text">
                <svg class="svg-button" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z"></path></svg>
                <div class="message">
                    Выберите диалог <br>
                    или создайте новый
                </div>
            </div>
            <div class="flex-filler"></div>
        </div>

        <div class="footer messages-footer" id="messages-footer">
            <div class="table-rows fullwidth">
                <div class="table-row text-3 table-columns">
                    <span>Тема: </span>
                    <input class="theme-input flex-filler" id="theme-input" placeholder="Без темы">
                </div>
                <div class="table-row table-columns">
                    <!--div class="table-rows">
                        <div class="flex-filler"></div>
                        <svg class="svg-button" id="change-theme-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99A2AD"><g transform="scale(1.2)"><path d="M9.56 4.1h3.54a.9.9 0 110 1.8H9.6c-1 0-1.69 0-2.23.04-.52.05-.82.13-1.05.24a2.6 2.6 0 00-1.14 1.14c-.11.23-.2.53-.24 1.05-.04.54-.04 1.24-.04 2.23v3.8c0 1 0 1.69.04 2.23.05.52.13.82.24 1.05.25.49.65.89 1.14 1.14.23.11.53.2 1.05.24.54.04 1.24.04 2.23.04h3.8c1 0 1.69 0 2.23-.04.52-.05.82-.13 1.05-.24a2.6 2.6 0 001.14-1.14c.11-.23.2-.53.24-1.05.04-.54.04-1.24.04-2.23v-3.5a.9.9 0 111.8 0v3.54c0 .95 0 1.71-.05 2.33a4.5 4.5 0 01-.43 1.73 4.4 4.4 0 01-1.92 1.92 4.5 4.5 0 01-1.73.43c-.62.05-1.38.05-2.33.05H9.56c-.95 0-1.71 0-2.33-.05a4.5 4.5 0 01-1.73-.43 4.4 4.4 0 01-1.92-1.92 4.51 4.51 0 01-.43-1.73c-.05-.62-.05-1.38-.05-2.33v-3.88c0-.95 0-1.71.05-2.33.05-.64.16-1.2.43-1.73A4.4 4.4 0 015.5 4.58a4.51 4.51 0 011.73-.43c.62-.05 1.38-.05 2.33-.05z"/><path d="M19.12 3.33a1.1 1.1 0 111.56 1.55l-.35.35a.4.4 0 01-.57 0l-.99-.99a.4.4 0 010-.56l.35-.35zm-.6 2.57l-.42-.42c-.44-.44-.72-.42-1.13 0l-5.13 5.12c-1.95 1.96-3.19 3.89-2.76 4.32.43.43 2.37-.8 4.32-2.76l5.12-5.13c.44-.44.42-.72 0-1.13z"/></g></svg>
                    </div-->
                    <textarea class="message-input text-1 scrollable" rows="1" id="message-input" tabindex="0" placeholder="Ваше сообщение..."></textarea>
                    <!--div class="table-rows">
                        <div class="flex-filler"></div>
                        <svg class="svg-button" id="attach-photo-button" xmlns="http://www.w3.org/2000/svg" height="35" width="35"><g transform="scale(1.3)" fill="none" stroke="#828a99" stroke-width="1.7"><path d="m14.134 3.65c.853 0 1.46.278 1.988.899.017.019.494.61.66.815.228.281.674.536.945.536h.41c2.419 0 3.863 1.563 3.863 4.05v5.85c0 2.241-2 4.2-4.273 4.2h-11.454c-2.267 0-4.223-1.953-4.223-4.2v-5.85c0-2.496 1.4-4.05 3.814-4.05h.409c.271 0 .717-.255.945-.536.166-.204.643-.796.66-.815.528-.621 1.135-.899 1.988-.899z"/><circle cx="12" cy="12" r="3.85"/></g></svg>
                    </div-->
                    <div class="table-rows">
                        <div class="flex-filler"></div>
                        <svg class="svg-button transparent" id="message-send-button" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path transform="scale(1.3)" d="m12.1 7.87v-3.47a1.32 1.32 0 0 1 2.17-1l8.94 7.6a1.32 1.32 0 0 1 .15 1.86l-.15.15-8.94 7.6a1.32 1.32 0 0 1 -2.17-1v-3.45c-4.68.11-8 1.09-9.89 2.87a1.15 1.15 0 0 1 -1.9-1.11c1.53-6.36 5.51-9.76 11.79-10.05zm1.8-2.42v4.2h-.9c-5.3 0-8.72 2.25-10.39 6.86 2.45-1.45 5.92-2.16 10.39-2.16h.9v4.2l7.71-6.55z"/></svg>
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

    // --- Configs
    const dialoguesByRequest = 15;
    const messagesByRequest = 10;

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
    let foundDialogues = [];
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
    };
    const lastDialogue = {
        realId: 0
    };
    const lastMessage = {
        htmlId: undefined,
        realId: undefined,
        elem: undefined,
        blockId: undefined,
        username: undefined,
        title: undefined
    };

    // --- Handlebars templates
    // because handlebars is not imported but added as script:
    // eslint-disable-next-line
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

    // eslint-disable-next-line
    const dialogueInnerHTMLTemplate = Handlebars.compile(`
        <img src="{{ avatar }}" alt="avatar" class="middle-avatar">
        <div class="floatright text-4">{{ time }}</div>
        <div class="dialogue-text">
            <div class="text-1">{{ title }}</div>
            <div class="dialogue-body text-2">{{ body }}</div>
        </div>`);

    // --- Get dialogues
    dialogues = await getDialogues(0, dialoguesByRequest);
    lastDialogue.realId = dialogues[dialogues.length - 1].id;

    // --- Draw dialogues
    redrawDialogues(dialogues);

    // if we have get-parameters in url => go to dialogue
    const gottenUsername = window.location.search.substring(6);
    if (gottenUsername !== '') {
        const dialogue = dialogues.find(item => item.username === gottenUsername);
        if (dialogue) {
            await setActiveDialogue(dialogue.elem);
        }
    }

    // create send message event-listener
    document.getElementById('message-send-button').addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', async (event) => {
        // check hotkey
        if (event.ctrlKey && event.keyCode === 13) {
            await sendMessage();
            messageInput.dispatchEvent(new Event('input')); // run input event (resize)
        }
    });
    // create resize message input event-listener
    messageInput.addEventListener('input', (event) => {
        // resize input element
        messageInput.style.height = messageInput.style.minHeight;
        messageInput.style.height = messageInput.scrollHeight + 2 + 'px'; // 2 = border-width * 2
    });

    // --- Find messages
    let isCreateDialogue = false;
    const addButton = document.getElementById('add-dialogue-button');
    // create clear-find event-listener
    document.getElementById('clear-find-button').addEventListener('click', (event) => {
        findInput.value = '';
        redrawDialogues(dialogues);
    });

    // create find keydown event-listener
    let lastFindInputValue = '';
    findInput.addEventListener('input', async (event) => {
        if (findInput.value === lastFindInputValue) { return; }
        lastFindInputValue = findInput.value;
        if (lastFindInputValue === '') {
            redrawDialogues(dialogues);
            return;
        }
        const response = await app.apiGet('/email/dialogues?find=' + lastFindInputValue);
        if (!response.ok) {
            app.messageError(`Ошибка ${response.status}`, 'Не удалось получить список писем!');
            return;
        }
        foundDialogues = await response.json();
        convertTimesToStr(foundDialogues);
        redrawDialogues(foundDialogues);
    });

    // create add-dialog event-listeners
    addButton.addEventListener('click', (event) => {
        if (!isCreateDialogue) {
            isCreateDialogue = true;
            findInput.focus();
            addButton.classList.add('switched');
            findInput.placeholder = 'Введите адрес получателя';
        } else {
            isCreateDialogue = false;
            addButton.classList.remove('switched');
            findInput.placeholder = 'Поиск диалога';
            const username = findInput.value;
            findInput.value = '';
            if (username === '') { return; }
            const foundDialogue = dialogues.find(item => item.username === username);
            if (foundDialogue) {
                setActiveDialogue(foundDialogue.elem);
                redrawDialogues(dialogues);
                return;
            }

            const dialogue = {
                username: username,
                body: '',
                time: getCurrentTime()
            };
            messages[username] = [];
            dialogues.push(dialogue);

            addDialogueToList(dialogue, dialogues.length - 1);
            setActiveDialogue(dialogue.elem);
            redrawDialogues(dialogues);
            scrollToBottom(dialoguePreviewsGroup);
        }
    });

    // create dialogues scroll event-listener to upload new dialogues
    dialoguePreviewsGroup.addEventListener('scroll', async (event) => {
        // if it not scrolled to bottom
        if (dialoguePreviewsGroup.scrollTop + dialoguePreviewsGroup.clientHeight !== dialoguePreviewsGroup.scrollHeight) {
            return;
        }
        // Get new dialogues
        const newDialogues = await getDialogues(lastDialogue.realId + 1, dialoguesByRequest);
        dialogues = dialogues.concat(newDialogues);
        if (newDialogues.length !== 0)
            lastDialogue.realId = newDialogues[newDialogues.length - 1].id;
        const dialoguesCount = dialoguePreviewsGroup.childElementCount;
        newDialogues.forEach((dialogue, htmlId) => {
            addDialogueToList(dialogue, dialoguesCount + htmlId);
        });

        if (newDialogues.length < dialoguesByRequest) {
            // TODO: plug-element
            addEndDialoguesElem(dialoguePreviewsGroup);
        }
    });

    // create messages scroll event-listener to upload new messages
    messagesField.addEventListener('scroll', async (event) => {
        // if it not scrolled to top
        if (messagesField.scrollTop !== 0) {
            return;
        }
        const dialogueMessages = messages[currentDialogue.username];
        // Get new messages
        const newMessages = await getMessages(currentDialogue.username, dialogueMessages[dialogueMessages.length - 1].id + 1, messagesByRequest);

        const heightToBottom = messagesField.clientHeight;
        const messagesCount = dialogueMessages.length;
        messages[currentDialogue.username] = dialogueMessages.concat(newMessages);
        newMessages.forEach((message, htmlId) => {
            addMessageToField(message, messagesCount + htmlId);
        });

        // TODO: Scroll to previous place
        messagesField.scrollTop = messagesField.clientHeight - heightToBottom;

        if (newMessages.length < messagesByRequest) {
            // TODO: plug-element
            addEndMessagesElem(messagesField);
        }
    });

    /**
     * Clear dialogues list and show new
     *
     * @param {object} dialogues dialogues to redraw
     */
    function redrawDialogues(dialogues) {
        dialoguePreviewsGroup.innerHTML = '';
        dialogues.forEach((dialogue, htmlId) => {
            addDialogueToList(dialogue, htmlId);
        });
    }

    /**
     * Converts DateTime format to string in all dialogues
     *
     * @param {object} dialogues dialogues to replace time in
     */
    function convertTimesToStr(array) {
        array.forEach((elem) => {
            elem.time = elem.time = (new ParsedDate(elem.time)).getShortDateString();
        });
    }

    /**
     * Get new dialogues list
     * @param since
     * @param amount
     * @returns {Promise<*>}
     */
    async function getDialogues(since, amount) {
        const response = await app.apiGet(`/email/dialogues?last=${since}&amount=${dialoguesByRequest}`);
        if (!response.ok) {
            app.messageError(`Ошибка ${response.status}`, 'Не удалось получить список диалогов!');
            return;
        }
        const dialogues = await response.json();
        convertTimesToStr(dialogues);
        return dialogues;
    }

    /**
     * Get new messages list
     * @param from
     * @param since
     * @param amount
     * @returns {Promise<*>}
     */
    async function getMessages(withUsername, since, amount) {
        const response = await app.apiGet(`/email/emails?with=${withUsername}&last=${since}&amount=${dialoguesByRequest}`);
        if (!response.ok) {
            // app.messageError('Сессия истекла', 'или диалога нет. Обновите страницу'); Просто открыт новый диалог
            return [];
        }
        const messages = await response.json();
        convertTimesToStr(messages);
        messages.forEach((message) => { message.body = [message.body]; }); // - for only one-message blocks
        return messages;
    }

    /**
     * Add dialogue to dialogues listing
     *
     * @param {object} dialogue ?
     * @param {(string|number)} htmlId html id to set to dialogue element
     */
    function addDialogueToList(dialogue, htmlId) {
        // check dialogue fields
        if (!dialogue.avatarUrl) {
            dialogue.avatarUrl = app.defaultAvatarUrl;
        }

        // create dialogue HTML-element
        dialogue.elem = document.createElement('li');
        dialogue.elem.id = htmlId;
        dialogue.elem.classList.add('listing-button');
        if (dialogue.username === currentDialogue.username) {
            dialogue.elem.classList.add('active');
            currentDialogue.elem = dialogue.elem;
        }
        dialogue.elem.innerHTML = dialogueInnerHTMLTemplate(
            { avatar: dialogue.avatarUrl, time: dialogue.time, title: dialogue.username, body: dialogue.body });
        dialoguePreviewsGroup.appendChild(dialogue.elem);

        // create Event-listener on dialogue element
        dialogue.elem.addEventListener('click', async (event) => {
            // set this dialogue active
            const currentElem = event.currentTarget;
            await setActiveDialogue(currentElem);
        });
    }

    /**
     * Set dialog active and draw it
     *
     * @param currentElem
     */
    async function setActiveDialogue(currentElem) {
        if (currentElem.id === currentDialogue.htmlId) { return; }
        currentDialogue.htmlId = currentElem.id;

        messagesFooter.style.display = 'flex'; // show message input

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
            messages[dialogue.username] = await getMessages(dialogue.username, 0, messagesByRequest);
        }

        // set dialogue url
        const currentPath = window.location.pathname + `?with=${currentDialogue.username}`;
        history.pushState({ url: currentPath }, '', currentPath);
        document.title = `${app.name} | Диалоги | ${currentDialogue.username}`;

        showDialogue(dialogue.username);
    }

    /**
     * draw all dialogue messages
     *
     * @param username
     */
    function showDialogue(username) {
        messagesField.innerHTML = '<div class="flex-filler"></div>'; // fill top
        // delete all lastMessage properties
        lastMessage.htmlId = undefined;
        lastMessage.realId = undefined;
        lastMessage.elem = undefined;
        lastMessage.blockId = -1;
        lastMessage.username = '';
        lastMessage.title = '';

        // create bottom message block
        const messageBlock = messages[username][0];
        const messageBlockElem = addMessageToField(messageBlock, 0);

        // update lastMessage data
        lastMessage.htmlId = 0;
        lastMessage.realId = messageBlock.id;
        lastMessage.elem = messageBlockElem;
        lastMessage.blockId = 0;
        lastMessage.title = messageBlock.title;
        lastMessage.username = messageBlock.sender;

        // create other messages blocks
        messages[username].slice(1).forEach((messageBlock, htmlId) => {
            addMessageToField(messageBlock, htmlId);
        });
        scrollToBottom(messagesField);
    }

    /**
     * Add message to messages field
     * @param messageBlock
     * @param htmlId
     * @returns {HTMLDivElement}
     */
    function addMessageToField(messageBlock, htmlId) {
        // create block of messages HTML-element
        const messageBlockElem = document.createElement('div');
        messageBlockElem.id = htmlId;

        // render message on right or left side
        if (messageBlock.sender.toLowerCase() === `${app.storage.username}@liokor.ru`.toLowerCase()) {
            messageBlockElem.classList.add('message-block-full', 'right-block');
            messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate({
                side: 'your',
                avatar: app.storage.avatar,
                time: messageBlock.time,
                title: messageBlock.title,
                body: [messageBlock.body]
            });
        } else {
            messageBlockElem.classList.add('message-block-full', 'left-block');
            messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate({
                side: 'not-your',
                avatar: currentDialogue.avatar,
                time: messageBlock.time,
                title: messageBlock.title,
                body: [messageBlock.body]
            });
        }
        messagesField.insertBefore(messageBlockElem, messagesField.firstChild);
        return messageBlockElem;
    }

    /**
     * Sends email
     */
    async function sendMessage() {
        // check inputs
        let currentTitle = themeInput.value;
        if (currentTitle === '') { currentTitle = 'Без темы'; }
        const message = messageInput.value;
        if (message === '') { return; }

        // send message request
        const response = await app.apiPost('/email', {
            recipient: currentDialogue.username,
            subject: currentTitle,
            body: message
        });
        if (!response.ok) {
            const data = await response.json();
            app.messageError(`Ошибка ${response.status}`, `Не удалось отправить письмо: ${data.message}`);
            return;
        }

        // clear input
        messageInput.value = '';

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
            const currentTime = getCurrentTime();
            messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate(
                { side: 'your', avatar: app.storage.avatar, time: currentTime, title: currentTitle, body: [message] });
            messagesField.appendChild(messageBlockElem);

            // update lastMessage data
            lastMessage.id = 0;
            lastMessage.blockId += 1;
            lastMessage.username = `${app.storage.username}@liokor.ru`;
            lastMessage.title = currentTitle;
            lastMessage.elem = messageBlockElem;

            // add block to messages list
            messages[currentDialogue.username].unshift({
                sender: `${app.storage.username}@liokor.ru`,
                title: currentTitle,
                time: currentTime,
                body: [message]
            });
        }
        scrollToBottom(messagesField);
    }

    /**
     * Returns current time in string format
     *
     * @returns {string}
     */
    function getCurrentTime() {
        return (new ParsedDate(new Date())).getShortDateString();
    }

    /**
     * Scroll scrollable element to top
     * @param element
     */
    function scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }
}
