import ParsedDate from '../modules/date';

const html = `
<div class="table-columns fullheight p-l bg-5">
    <div class="table-column dialogues-column table-rows bg-transparent">
        <div class="header tool-dialogue table-columns">
            <!--svg class="svg-button" xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path transform="scale(2.2) translate(-1,-1)" d="M10 3.25c.41 0 .75.34.75.75v5.25H16a.75.75 0 010 1.5h-5.25V16a.75.75 0 01-1.5 0v-5.25H4a.75.75 0 010-1.5h5.25V4c0-.41.34-.75.75-.75z"/></svg-->
            <!--svg class="svg-button middle-avatar" id="find-dialogue-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1.8) translate(2, -1)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g></svg-->
            <svg class="svg-button middle-avatar" id="find-dialogue-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.07) translate(30,30)"><path d="M506.141,477.851L361.689,333.399c65.814-80.075,61.336-198.944-13.451-273.73c-79.559-79.559-209.01-79.559-288.569,0    s-79.559,209.01,0,288.569c74.766,74.766,193.62,79.293,273.73,13.451l144.452,144.452c7.812,7.812,20.477,7.812,28.289,0    C513.953,498.328,513.953,485.663,506.141,477.851z M319.949,319.948c-63.96,63.96-168.03,63.959-231.99,0    c-63.96-63.96-63.96-168.03,0-231.99c63.958-63.957,168.028-63.962,231.99,0C383.909,151.918,383.909,255.988,319.949,319.948z"/><path xmlns="http://www.w3.org/2000/svg" d="M301.897,183.949h-77.94v-77.94c0-11.048-8.956-20.004-20.004-20.004c-11.048,0-20.004,8.956-20.004,20.004v77.94h-77.94    c-11.048,0-20.004,8.956-20.004,20.004c0,11.048,8.956,20.004,20.004,20.004h77.94v77.94c0,11.048,8.956,20.004,20.004,20.004    c11.048,0,20.004-8.956,20.004-20.004v-77.94h77.94c11.048,0,20.004-8.956,20.004-20.004    C321.901,192.905,312.945,183.949,301.897,183.949z"/></g></svg>
            <input class="flex-filler find-input input" type="text" autocomplete="off" placeholder="Найти или создать диалог" id="find-input">
            <svg class="svg-button transparent centered input-clear" id="clear-find-button" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 10.5857864 4.7928932-4.79289318c.3905243-.39052429 1.0236893-.39052429 1.4142136 0s.3905243 1.02368927 0 1.41421356l-4.7928932 4.79289322 4.7928932 4.7928932c.3905243.3905243.3905243 1.0236893 0 1.4142136s-1.0236893.3905243-1.4142136 0l-4.7928932-4.7928932-4.79289322 4.7928932c-.39052429.3905243-1.02368927.3905243-1.41421356 0s-.39052429-1.0236893 0-1.4142136l4.79289318-4.7928932-4.79289318-4.79289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0z"/></svg>
        </div>

        <ul class="table-rows dialogues-listing scrollable" id="dialogues-listing">
        </ul>
    </div>

    <div class="table-column table-rows messages-column bg-transparent">
        <div class="header table-columns">
            <span class="text-1 centered" id="dialogue-header-title"></span>
            <span class="text-3 flex-filler centered" id="dialogue-header-time" style="margin-left: 10px">Выберите диалог</span>
            <linkbutton class="svg-button" href="/user" pointer-events="auto"><svg pointer-events="none" id="clear-find-button" style="margin-right: 10px" xmlns="http://www.w3.org/2000/svg" height="30" width="30"><g transform="scale(1.5)"><path d="m3.0000001 14.5c0-3.1424487 3.08132567-4.50000038 6.9999999-4.50000038 3.9186742 0 6.9999999 1.35755168 6.9999999 4.50000038 0 1.615596-1.0761803 2.5000004-2.3000001 2.5000004h-9.39999961c-1.22381984 0-2.30000009-.8844044-2.30000009-2.5000004zm1.8 0c0 .5349234.20087263.7000004.50000009.7000004h9.39999961c.2991275 0 .5000001-.165077.5000001-.7000004 0-1.7450508-2.1675128-2.7000004-5.1999999-2.7000004-3.03248714 0-5.1999999.9549496-5.1999999 2.7000004zm9.0999999-9.5c0 2.15455627-1.7454437 3.9-3.9 3.9-2.15455627 0-3.9-1.74544373-3.9-3.9s1.74544373-3.9 3.9-3.9c2.1545563 0 3.9 1.74544373 3.9 3.9zm-1.8 0c0-1.16044373-.9395563-2.1-2.1-2.1-1.16044373 0-2.1.93955627-2.1 2.1s.93955627 2.1 2.1 2.1c1.1604437 0 2.1-.93955627 2.1-2.1z"/></g></svg></linkbutton>
        </div>

        <div class="body flex-filler table-rows scrollable" id="messages-field">
            <div class="flex-filler center-text"></div>
            <div class="center-text">
                <svg class="svg-button" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z"></path><path d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z"></path></svg>
                <div class="text-1">
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
                    <!--svg class="svg-button top-filler" id="change-theme-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99A2AD"><g transform="scale(1.2)"><path d="M9.56 4.1h3.54a.9.9 0 110 1.8H9.6c-1 0-1.69 0-2.23.04-.52.05-.82.13-1.05.24a2.6 2.6 0 00-1.14 1.14c-.11.23-.2.53-.24 1.05-.04.54-.04 1.24-.04 2.23v3.8c0 1 0 1.69.04 2.23.05.52.13.82.24 1.05.25.49.65.89 1.14 1.14.23.11.53.2 1.05.24.54.04 1.24.04 2.23.04h3.8c1 0 1.69 0 2.23-.04.52-.05.82-.13 1.05-.24a2.6 2.6 0 001.14-1.14c.11-.23.2-.53.24-1.05.04-.54.04-1.24.04-2.23v-3.5a.9.9 0 111.8 0v3.54c0 .95 0 1.71-.05 2.33a4.5 4.5 0 01-.43 1.73 4.4 4.4 0 01-1.92 1.92 4.5 4.5 0 01-1.73.43c-.62.05-1.38.05-2.33.05H9.56c-.95 0-1.71 0-2.33-.05a4.5 4.5 0 01-1.73-.43 4.4 4.4 0 01-1.92-1.92 4.51 4.51 0 01-.43-1.73c-.05-.62-.05-1.38-.05-2.33v-3.88c0-.95 0-1.71.05-2.33.05-.64.16-1.2.43-1.73A4.4 4.4 0 015.5 4.58a4.51 4.51 0 011.73-.43c.62-.05 1.38-.05 2.33-.05z"/><path d="M19.12 3.33a1.1 1.1 0 111.56 1.55l-.35.35a.4.4 0 01-.57 0l-.99-.99a.4.4 0 010-.56l.35-.35zm-.6 2.57l-.42-.42c-.44-.44-.72-.42-1.13 0l-5.13 5.12c-1.95 1.96-3.19 3.89-2.76 4.32.43.43 2.37-.8 4.32-2.76l5.12-5.13c.44-.44.42-.72 0-1.13z"/></g></svg-->
                    <textarea class="message-input text-1 scrollable input" rows="1" id="message-input" tabindex="0" placeholder="Ваше сообщение..."></textarea>
                    <!--svg class="svg-button top-filler" id="attach-photo-button" xmlns="http://www.w3.org/2000/svg" height="35" width="35"><g transform="scale(1.3)" fill="none" stroke="#828a99" stroke-width="1.7"><path d="m14.134 3.65c.853 0 1.46.278 1.988.899.017.019.494.61.66.815.228.281.674.536.945.536h.41c2.419 0 3.863 1.563 3.863 4.05v5.85c0 2.241-2 4.2-4.273 4.2h-11.454c-2.267 0-4.223-1.953-4.223-4.2v-5.85c0-2.496 1.4-4.05 3.814-4.05h.409c.271 0 .717-.255.945-.536.166-.204.643-.796.66-.815.528-.621 1.135-.899 1.988-.899z"/><circle cx="12" cy="12" r="3.85"/></g></svg-->
                    <svg class="svg-button transparent top-filler input-clear" id="message-send-button" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path transform="scale(1.3)" d="m12.1 7.87v-3.47a1.32 1.32 0 0 1 2.17-1l8.94 7.6a1.32 1.32 0 0 1 .15 1.86l-.15.15-8.94 7.6a1.32 1.32 0 0 1 -2.17-1v-3.45c-4.68.11-8 1.09-9.89 2.87a1.15 1.15 0 0 1 -1.9-1.11c1.53-6.36 5.51-9.76 11.79-10.05zm1.8-2.42v4.2h-.9c-5.3 0-8.72 2.25-10.39 6.86 2.45-1.45 5.92-2.16 10.39-2.16h.9v4.2l7.71-6.55z"/></svg>
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
 * @param element
 * @param app
 * @returns {Promise<void>}
 */
export async function source(element, app) {
    if (!app.storage.username) {
        await app.goto('/auth');
        return;
    }

    document.title = `${app.name} | Диалоги`;
    element.innerHTML = html;

    // --- Configs
    const dialoguesByRequest = 500;
    const messagesByRequest = 10;
    const messagesScrollLoadOffset = 40;
    const dialoguesScrollLoadOffset = 20;

    // --- HTML elements
    const dialoguePreviewsGroup = document.getElementById('dialogues-listing');
    const dialogueHeader = document.getElementById('dialogue-header-title');
    const dialogueTime = document.getElementById('dialogue-header-time');

    const messagesField = document.getElementById('messages-field');
    const messagesFooter = document.getElementById('messages-footer');

    const findInput = document.getElementById('find-input');
    const themeInput = document.getElementById('theme-input');
    const messageInput = document.getElementById('message-input');
    // --- Plug-elements
    const plugStates = {
        loading: 0,
        end: 1,
        none: 2
    };
    // --- Big containers
    const dialogues = {
        storage: [],
        plug: plugStates.loading
    };
    let foundDialogues = [];
    const messages = {};
    // --- One-element containers
    const currentDialogue = {
        id: undefined,
        idInDialogues: undefined,
        elem: dialoguePreviewsGroup,
        title: undefined,
        time: undefined,
        avatar: undefined,
        username: undefined
    };
    let createdDialogues = 0;
    let createdMessages = 0;
    // --- Handlebars templates
    // because handlebars is not imported but added as script:
    // eslint-disable-next-line
    const messageBlockInnerHTMLTemplate = Handlebars.compile(`
        <div class="message-block {{ side }}">
            <img src="{{ avatar }}" alt="avatar" class="middle-avatar">
            <div class="floatright text-4 p-m">{{ time }}</div>
            <div class="message-block-title">{{ title }}</div>
            {{#each body}}
                <div id="{{ @index }}" class="message-body">{{ this }}</div>
            {{/each}}
        </div>`);

    // eslint-disable-next-line
    const dialogueInnerHTMLTemplate = Handlebars.compile(`
        <img src="{{ avatar }}" alt="avatar" class="middle-avatar">
        <div class="floatright text-4">{{ time }}</div>
        <div class="dialogue-text">
            <div class="text-1">{{ title }}</div>
            <div class="dialogue-body text-2">{{ body }}</div>
        </div>`);

    const getMaxId = (objList) => Math.max(...objList.map(({ id }) => id));

    // --- Get dialogues
    dialogues.storage = await getDialogues(-1, dialoguesByRequest);
    if (dialogues.storage.length < dialoguesByRequest) {
        dialogues.plug = plugStates.end;
    }

    // --- Draw dialogues
    redrawDialogues(dialogues.storage);

    // if we have get-parameters in url => go to dialogue
    const gottenUsername = window.location.search.substring(6);
    if (gottenUsername !== '') {
        const dialogue = dialogues.storage.find(item => item.username === gottenUsername);
        if (dialogue) {
            await setActiveDialogue(dialogue.elem);
        }
    }

    // create send message event-listener
    document.getElementById('message-send-button').addEventListener('click', async (event) => {
        await sendMessage();
        messageInput.dispatchEvent(new Event('input')); // trigger resize event-listener
    });
    // create send message event-listener by ctrl+Enter
    messageInput.addEventListener('keydown', async (event) => {
        if (event.keyCode === 27) { // Esc
            messageInput.blur();
        } else if (event.ctrlKey && event.keyCode === 13) { // ctrl+Enter
            await sendMessage();
            messageInput.blur();
            messageInput.dispatchEvent(new Event('input')); // trigger resize event-listener
        }
    });
    // create resize message input event-listener
    messageInput.addEventListener('input', (event) => {
        // resize input element
        messageInput.style.height = messageInput.style.minHeight;
        messageInput.style.height = messageInput.scrollHeight + 2 + 'px'; // 2 = border-width * 2
    });

    // --- Find dialogues
    let lastDialoguesPlug = dialogues.plug;
    // create clear-find event-listener
    document.getElementById('clear-find-button').addEventListener('click', (event) => {
        dialogues.plug = lastDialoguesPlug;
        findInput.value = '';
        redrawDialogues(dialogues.storage);
    });

    // create find input event-listener
    findInput.addEventListener('input', async (event) => {
        if (dialogues.plug !== plugStates.none) {
            lastDialoguesPlug = dialogues.plug;
            dialogues.plug = plugStates.none;
        }
        const findText = findInput.value;
        if (findText === '') {
            dialogues.plug = lastDialoguesPlug;
            redrawDialogues(dialogues.storage);
            return;
        }
        const response = await app.apiGet('/email/dialogues?find=' + findText);
        if (!response.ok) {
            app.messageError(`Ошибка ${response.status}`, 'Не удалось получить список писем!');
            return;
        }
        foundDialogues = await response.json();
        convertTimesToStr(foundDialogues);
        redrawDialogues(foundDialogues);

        const foundDialogue = dialogues.storage.findIndex(item => item.username === findText);
        if (foundDialogue === -1) {
            addCreateNewDialogueElem();
        }
    });

    // create event-listener on 'Enter' in input
    findInput.addEventListener('keydown', async (event) => {
        if (event.keyCode === 27) { // Esc
            findInput.blur();
        } else if (event.keyCode === 13) { // Enter
            dialogues.plug = lastDialoguesPlug;
            await addOrSetDialogue(findInput.value);
            findInput.value = '';
        }
    });

    // create add-dialogue event-listener
    document.getElementById('find-dialogue-button').addEventListener('click', (event) => {
        findInput.focus();
        findInput.dispatchEvent(new Event('input')); // trigger find event-listener
    });

    // create dialogues scroll event-listener to upload new dialogues
    // ОТВАЛ ЖОПЫ
    /*
    dialoguePreviewsGroup.addEventListener('scroll', async (event) => {
        // if it not scrolled to bottom
        if (dialoguePreviewsGroup.scrollTop + dialoguePreviewsGroup.clientHeight < dialoguePreviewsGroup.scrollHeight - dialoguesScrollLoadOffset) {
            return;
        }
        // Get new dialogues
        const newDialogues = await getDialogues(getMaxId(dialogues.storage), dialoguesByRequest);

        dialogues.storage = dialogues.storage.concat(newDialogues);
        newDialogues.forEach((dialogue) => {
            addDialogueToList(dialogue);
        });

        if (newDialogues.length < dialoguesByRequest) {
            dialogues.plug = plugStates.end;
        } else {
            dialogues.plug = plugStates.loading;
        }
        redrawDialoguesPlug();
    });
    */

    // create messages scroll event-listener to upload new messages
    let mutexScrollMessagesEvent = false; // Убейте меня за это пожалуйсто...
    messagesField.addEventListener('scroll', async (event) => {
        // if it not scrolled to top
        if (messagesField.scrollTop > messagesScrollLoadOffset) { return; }

        if (mutexScrollMessagesEvent === true) { return; } // mutex logic
        mutexScrollMessagesEvent = true; // block mutex

        const dialogueMessages = messages[currentDialogue.username];
        let since = 0;
        if (dialogueMessages.length !== 0) { since = dialogueMessages[dialogueMessages.length - 1].id; }
        // Get new messages
        const newMessages = await getMessages(currentDialogue.username, since, messagesByRequest);

        const heightToBottom = getChildrenHeight(messagesField) - messagesField.scrollTop;
        messages[currentDialogue.username] = dialogueMessages.concat(newMessages);

        newMessages.forEach((message) => {
            addMessageToField(message);
        });

        if (newMessages.length < messagesByRequest) {
            messages[currentDialogue.username].plug = plugStates.end;
        } else {
            messages[currentDialogue.username].plug = plugStates.loading;
        }

        // Scroll to previous place
        messagesField.scrollTop = getChildrenHeight(messagesField) - heightToBottom;

        redrawMessagesPlug(messages[currentDialogue.username]);

        mutexScrollMessagesEvent = false; // unblock mutex
    });

    /**
     * Clear dialogues list and show new
     *
     * @param {object} dialogues dialogues to redraw
     */
    function redrawDialogues(dialogues) {
        dialoguePreviewsGroup.innerHTML = '';
        dialogues.forEach((dialogue) => {
            addDialogueToList(dialogue);
        });

        redrawDialoguesPlug();
    }

    /**
     * Delete dialogues plug and set new
     */
    function redrawDialoguesPlug() {
        const plug = document.getElementById('dialogues-plug');
        if (plug) { plug.remove(); }
        switch (dialogues.plug) {
        case plugStates.end:
            addEndDialoguesElem(dialoguePreviewsGroup, 'dialogues-plug');
            break;
        case plugStates.loading:
            addLoadingElem(dialoguePreviewsGroup, false, 'empty-dialogue', 'dialogues-plug');
            break;
        }
    }

    /**
     * Delete messages plug and set new
     *
     * @param message
     */
    function redrawMessagesPlug(message) {
        const plug = document.getElementById('messages-plug');
        if (plug) { plug.remove(); }

        switch (message.plug) {
        case plugStates.end:
            addEndMessagesElem(messagesField, 'messages-plug');
            break;
        case plugStates.loading:
            addLoadingElem(messagesField, true, 'flex-filler', 'messages-plug');
            break;
        case plugStates.none:
            addFlexFillerElem(messagesField, 'messages-plug');
            break;
        }
    }

    /**
     * Converts DateTime format to string in all array elements
     *
     * @param array to replace time in
     */
    function convertTimesToStr(array) {
        array.forEach((elem) => {
            elem.time = elem.time = (new ParsedDate(elem.time)).getShortDateString();
        });
    }

    /**
     * Get new dialogues list
     *
     * @param since
     * @param amount
     * @param find
     * @returns {Promise<*>}
     */
    async function getDialogues(since, amount, find) {
        let path = `/email/dialogues?last=${since}&amount=${amount}`;
        if (find && find !== '') { path += '&find=' + find; }
        const response = await app.apiGet(path);
        if (!response.ok) {
            app.messageError(`Ошибка ${response.status}`, 'Не удалось получить список диалогов!');
            return [];
        }
        const dialogues = await response.json();
        if (!dialogues) { return []; }
        convertTimesToStr(dialogues);
        return dialogues;
    }

    /**
     * Get new messages list
     *
     * @param withUsername
     * @param since
     * @param amount
     * @returns {Promise<*>}
     */
    async function getMessages(withUsername, since, amount) {
        const response = await app.apiGet(`/email/emails?with=${withUsername}&last=${since}&amount=${amount}`);
        if (!response.ok) {
            // app.messageError('Сессия истекла', 'или диалога нет. Обновите страницу'); Просто открыт новый диалог
            return [];
        }
        const messages = await response.json();
        if (!messages) { return []; }
        convertTimesToStr(messages);
        messages.forEach((message) => { message.body = [message.body]; }); // - for only one-message blocks
        return messages;
    }

    /**
     * Add dialogue on bottom of dialogues listing
     *
     * @param {object} dialogue ?
     */
    function addDialogueToList(dialogue) {
        // check dialogue fields
        if (!dialogue.avatarUrl) {
            dialogue.avatarUrl = app.defaultAvatarUrl;
        }

        // create dialogue HTML-element
        dialogue.elem = document.createElement('li');
        dialogue.elem.id = 'dialogue-' + dialogue.id;
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
     * Add create new dialogue element on top of dialogues listing
     */
    function addCreateNewDialogueElem() {
        // create dialogue HTML-element
        const elem = document.createElement('li');
        elem.id = 'new-dialogue-button';
        elem.classList.add('listing-button', 'center-text', 'p-xs');
        elem.innerHTML = `<svg class="plus-button" id="find-dialogue-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(3) translate(1, -2)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g></svg>`;
        dialoguePreviewsGroup.insertBefore(elem, dialoguePreviewsGroup.firstChild);

        // create Event-listener on element
        elem.addEventListener('click', async (event) => {
            await addOrSetDialogue(findInput.value);
            findInput.value = '';
        });
    }

    /**
     * Set dialog active and draw it
     *
     * @param currentElem
     */
    async function setActiveDialogue(currentElem) {
        if (currentElem.id === 'dialogue-' + currentDialogue.id) { return; }
        currentDialogue.id = currentElem.id.substr(9) // length if 'dialogue-' ;

        messagesFooter.style.display = 'flex'; // show message input

        currentDialogue.elem.classList.remove('active'); // "deactivate" previous dialogue
        currentDialogue.elem = currentElem;
        currentDialogue.elem.classList.add('active'); // "activate" current dialogue

        // update messages header
        const dialogue = dialogues.storage.find((item) => item.id === Number(currentDialogue.id)); // get dialogue data
        dialogueHeader.innerText = currentDialogue.title = dialogue.username;
        dialogueTime.innerText = currentDialogue.time = dialogue.time;

        // update currentDialogue data
        currentDialogue.id = dialogue.id;
        currentDialogue.avatar = dialogue.avatarUrl;
        currentDialogue.username = dialogue.username;

        // get dialogue messages
        if (!messages[dialogue.username]) {
            messages[dialogue.username] = await getMessages(dialogue.username, -1, messagesByRequest);
        }
        if (messages[dialogue.username].length < messagesByRequest) { messages[dialogue.username].plug = plugStates.end; } else { messages[dialogue.username].plug = plugStates.loading; }

        // set dialogue url
        const currentPath = window.location.pathname + `?with=${currentDialogue.username}`;
        history.pushState({ url: currentPath }, '', currentPath);
        document.title = `${app.name} | Диалоги | ${currentDialogue.username}`;

        showDialogue(dialogue.username);
    }

    async function addOrSetDialogue(username) {
        if (username === '') { return; }
        themeInput.focus();
        const foundDialogue = dialogues.storage.find(item => item.username === username);
        if (foundDialogue) {
            await setActiveDialogue(foundDialogue.elem);
            redrawDialogues(dialogues.storage);
            return;
        }

        createdDialogues += 1;
        const dialogue = {
            id: -createdDialogues,
            username: username,
            body: '',
            time: getCurrentTime()
        };
        messages[username] = [];
        dialogues.storage.unshift(dialogue);

        addDialogueToList(dialogue);
        await setActiveDialogue(dialogue.elem);
        redrawDialogues(dialogues.storage);
        scrollToTop(dialoguePreviewsGroup);
    }
    /**
     * draw all dialogue messages
     *
     * @param username
     */
    function showDialogue(username) {
        messagesField.innerHTML = '';

        if (messages[username].length !== 0) {
            // create bottom message block
            const messageBlock = messages[username][0];
            const messageBlockElem = addMessageToField(messageBlock);

            // create other messages blocks
            messages[username].slice(1).forEach((messageBlock) => {
                addMessageToField(messageBlock);
            });
        }
        redrawMessagesPlug(messages[username]);
        scrollToBottom(messagesField);
    }

    /**
     * Add message to messages field
     *
     * @param messageBlock
     * @returns {HTMLDivElement}
     */
    function addMessageToField(messageBlock) {
        // create block of messages HTML-element
        const messageBlockElem = document.createElement('div');
        messageBlockElem.id = 'message-' + messageBlock.id;

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

        // update dialogue preview
        currentDialogue.elem.lastElementChild.lastElementChild.innerText = message;

        // add message HTML-block
        const lastMessage = messages[currentDialogue.username][0];
        if (lastMessage && lastMessage.sender.toLowerCase() === `${app.storage.username}@liokor.ru`.toLowerCase() && lastMessage.title === currentTitle) {
            document.getElementById('message-' + lastMessage.id).firstElementChild.innerHTML += `<div id="${lastMessage.id}" class="message-body">${message}</div>`;

            messages[currentDialogue.username][0].body.push(message);
        } else {
            // create new messages block HTML-element
            const messageBlockElem = document.createElement('div');
            createdMessages += 1;
            messageBlockElem.id = 'message-' + -createdMessages;
            messageBlockElem.classList.add('message-block-full', 'right-block');
            const currentTime = getCurrentTime();
            messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate(
                { side: 'your', avatar: app.storage.avatar, time: currentTime, title: currentTitle, body: [message] });
            messagesField.appendChild(messageBlockElem);

            // add block to messages list
            messages[currentDialogue.username].unshift({
                id: -createdMessages,
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
     * Scroll scrollable element to bottom
     *
     * @param element
     */
    function scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }

    /**
     * Scroll scrollable element to top
     *
     * @param element
     */
    function scrollToTop(element) {
        element.scrollTop = 0;
    }

    /**
     * Add plug-end of messages element
     *
     * @param parent
     * @param id
     */
    function addEndMessagesElem(parent, id) {
        const elem = document.createElement('div');
        elem.classList.add('center-text', 'top-filler');
        elem.id = id;
        elem.innerHTML = `
                    <svg class="svg-button centered" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z"></path></svg>
                    <div class="text-1">Это начало истории сообщений</div>
                `;
        parent.insertBefore(elem, parent.firstChild);
    }

    /**
     * @param parent
     * @param id
     */
    function addFlexFillerElem(parent, id) {
        const elem = document.createElement('div');
        elem.classList.add('flex-filler');
        if (id !== '') { elem.id = id; }
        parent.insertBefore(elem, parent.firstChild);
    }

    /**
     * Add plug-end of dialogues element
     *
     * @param parent
     * @param id
     */
    function addEndDialoguesElem(parent, id) {
        const elem = document.createElement('div');
        elem.classList.add('center-text', 'empty-dialogue');
        elem.id = id;
        elem.innerHTML = `
                <svg class="svg-button" pointer-events="none" width="40" height="30" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.6)"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z"></path><path d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z"></path></g></svg>
                <div class="text-3">Больше диалогов нет</div>`;
        parent.appendChild(elem);
    }

    /**
     * Add plug-loading element
     *
     * @param listingElem
     * @param isAddToTop
     * @param addClasses
     * @param id
     */
    function addLoadingElem(listingElem, isAddToTop, addClasses, id) {
        const elem = document.createElement('div');
        elem.classList.add('center-text', 'load-animation', addClasses);
        elem.id = id;
        elem.innerHTML = '<div class="dot-pulse"></div>';
        if (isAddToTop === true) { listingElem.insertBefore(elem, listingElem.firstChild); } else { listingElem.appendChild(elem); }
    }

    /**
     * Return sum of element children height
     *
     * @param elem
     * @returns {number}
     */
    function getChildrenHeight(elem) {
        let height = 0;
        elem.childNodes.forEach((child) => {height += child.clientHeight;});
        return height;
    }
}
