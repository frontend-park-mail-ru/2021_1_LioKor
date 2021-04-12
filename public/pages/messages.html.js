const html = `
<div class="table-columns fullheight p-l">
    <div class="table-column dialogues-column table-rows">
        <div class="p-m">
            <img src="/images/plus.png" alt="plus" class="middle-avatar" id="plus-dialog-button">
        </div>
 
        <ul class="table-rows dialogues-listing" id="dialogues">
            <li id="dialogue-test" class="listing-button">
                <img src="/images/default-avatar.jpg" alt="avatar" class="middle-avatar">
                <div class="floatright text-4">22:15</div>
                <div class="dialogue-text">
                    <div class="text-1">Test name</div>
                    <div class="dialogue-body text-2">Test body...</div>
                </div>
            </li>
        </ul>
    </div>
    
    <div class="table-column table-rows messages-column">
        <div class="header">
            <span class="text-1" id="dialogue-header-title">Dialog title</span>
            <span class="text-3" id="dialogue-header-time" style="padding-left: 10px">Last message: xx:xx</span>
        </div>
         
        <div class="body flex-filler table-rows">
            <div class="flex-filler"></div>
            <div class="left-messages-block">
                <img src="/images/default-avatar.jpg" alt="avatar" class="middle-avatar">
                <span class="message-title">От Васи</span>
                <div class="message">
                    Left message
                </div>
            </div>
            <div class="right-messages-block">
                <img src="/images/liokor_logo.png" alt="avatar" class="middle-avatar">
                <span class="message-title">От тебя</span>
                <div class="message">
                    Right message
                </div>
            </div>
        </div>
        
        <div class="footer">
            <input class="message-input" placeholder="Input message here">
        </div>
    </div>
</div>
`;

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

    const response = await app.apiGet('/dialogues');
    const data = await response.json();

    const dialoguePreviewsGroup = document.getElementById('dialogues');

    const dialogueHeader = document.getElementById('dialogue-header-title');
    const dialogueTime = document.getElementById('dialogue-header-time');

    const dialogues = data['dialogues'];

    const messages =

    dialogues.forEach(function(dialogue, id) {
        const dialogueElem = document.createElement("li");
        dialogueElem.id = id;
        dialogueElem.classList.add('listing-button');
        dialogueElem.innerHTML = `
            <img src="/images/liokor_logo.png" alt="avatar" class="middle-avatar">
            <div class="floatright text-4">${dialogue.time}</div>
            <div class="dialogue-text">
                <div class="text-1">${dialogue.title}</div>
                <div class="dialogue-body text-2">${dialogue.body}</div>
            </div>
        `
        dialoguePreviewsGroup.appendChild(dialogueElem);
    });

    let currentDialogueElem = dialoguePreviewsGroup;
    let dialogueId = -1;

}
