import Handlebars from 'handlebars/dist/cjs/handlebars';

import { validateEmail } from '../modules/validators';

const html = `
<div class="table-columns fullheight p-l bg-5" id="messages-page">
    <div class="table-column dialogues-column table-rows bg-transparent mobile-fullwidth" id="dialogues-column">
        <div class="header tool-dialogue table-columns pos-relative">
            <img class="centered-vertical middle-avatar mobile-only" src="/images/liokor_logo.png" alt="лого">
            <div class="flex-filler table-columns reversed pos-relative">
                <input class="find-input input-with-clear fullheight" type="text" autocomplete="off" placeholder="Создать или найти диалог" id="find-input">
                <svg class="folders-button svg-button middle-avatar" id="folders-button" xmlns="http://www.w3.org/2000/svg"><g><path transform="scale(0.065) translate(80,15)" d="M448.916,118.259h-162.05c-6.578,0-13.003-2.701-17.44-7.292l-50.563-53.264c-12.154-12.115-28.783-18.443-45.625-18.346    H63.084C28.301,39.356,0,67.657,0,102.439v307.123c0,34.783,28.301,63.084,63.084,63.084h386.064h0.058    c34.764-0.154,62.949-28.59,62.794-63.277V181.342C512,146.559,483.699,118.259,448.916,118.259z M473.417,409.447    c0.058,13.504-10.88,24.558-24.307,24.616H63.084c-13.504,0-24.5-10.996-24.5-24.5V102.439c0-13.504,10.996-24.5,24.5-24.52    H173.74c0.212,0,0.424,0,0.637,0c6.443,0,12.694,2.566,16.899,6.733l50.293,53.013c11.806,12.192,28.32,19.176,45.297,19.176    h162.05c13.504,0,24.5,10.996,24.5,24.5V409.447z"/><path id="folder-icon-arrow" d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/></g></svg>
                <svg class="svg-button transparent centered-vertical input-clear inside-input" id="clear-find-button" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 10.5857864 4.7928932-4.79289318c.3905243-.39052429 1.0236893-.39052429 1.4142136 0s.3905243 1.02368927 0 1.41421356l-4.7928932 4.79289322 4.7928932 4.7928932c.3905243.3905243.3905243 1.0236893 0 1.4142136s-1.0236893.3905243-1.4142136 0l-4.7928932-4.7928932-4.79289322 4.7928932c-.39052429.3905243-1.02368927.3905243-1.41421356 0s-.39052429-1.0236893 0-1.4142136l4.79289318-4.7928932-4.79289318-4.79289322c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0z"/></svg>
            </div>
            <svg class="svg-button middle-avatar" id="find-dialogue-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(2) translate(0, -2)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g></svg>
            <linkbutton class="svg-button middle-avatar centered-vertical profile-button mobile-only" href="/user" pointer-events="auto"><svg pointer-events="none" id="clear-find-button" xmlns="http://www.w3.org/2000/svg"><g><path d="m3.0000001 14.5c0-3.1424487 3.08132567-4.50000038 6.9999999-4.50000038 3.9186742 0 6.9999999 1.35755168 6.9999999 4.50000038 0 1.615596-1.0761803 2.5000004-2.3000001 2.5000004h-9.39999961c-1.22381984 0-2.30000009-.8844044-2.30000009-2.5000004zm1.8 0c0 .5349234.20087263.7000004.50000009.7000004h9.39999961c.2991275 0 .5000001-.165077.5000001-.7000004 0-1.7450508-2.1675128-2.7000004-5.1999999-2.7000004-3.03248714 0-5.1999999.9549496-5.1999999 2.7000004zm9.0999999-9.5c0 2.15455627-1.7454437 3.9-3.9 3.9-2.15455627 0-3.9-1.74544373-3.9-3.9s1.74544373-3.9 3.9-3.9c2.1545563 0 3.9 1.74544373 3.9 3.9zm-1.8 0c0-1.16044373-.9395563-2.1-2.1-2.1-1.16044373 0-2.1.93955627-2.1 2.1s.93955627 2.1 2.1 2.1c1.1604437 0 2.1-.93955627 2.1-2.1z"/></svg></g></linkbutton>
        </div>

        <div class="table-rows pos-relative">
            <div class="connection-info center-text mobile-only">
                <svg class="svg-button" xmlns="http://www.w3.org/2000/svg"><path d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z"/><path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z"/></svg>
                <span class="text-1" id="connection-text">Соединение потеряно</span>
                <svg class="svg-button floatright" id="refresh-connection-button" xmlns="http://www.w3.org/2000/svg" style="transition: all ease-in-out 1s; transform: rotate(0deg)"><g transform="scale(0.04) translate(60, 0)"><path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"/><path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8    c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4    C456.056,357.911,481.656,274.811,462.456,195.511z"/></g></svg>
            </div>
            
            <ul class="dialogues-listing scrollable" id="dialogues-listing">
            </ul>
        </div>
    </div>

    <div class="table-column table-rows messages-column bg-transparent" id="messages-column">
        <div class="header table-columns">
            <div class="header-title bg-transparent table-columns" id="header-title-button">
                <svg class="svg-button small-avatar centered-vertical mobile-only" id="back-button" xmlns="http://www.w3.org/2000/svg" style="overflow: visible; transform: scale(1.2)"><g class="centered" style="transform: scale(0.8) rotate(180deg); transform-origin: center center"><path xmlns="http://www.w3.org/2000/svg" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"/></g></svg>
                <span class="text-1 centered-vertical" style="margin-left: 5px" id="dialogue-header-title"></span>
            </div>
            <div class="text-3 centered desktop-only" id="dialogue-header-time" style="margin-left: 10px">Выберите диалог</div>
            <div class="flex-filler"></div>
            <span class="text-2 centered-vertical desktop-only" id="profile-link-username" style="margin-right: 5px">username@liokor.ru</span>
            <linkbutton class="svg-button middle-avatar centered-vertical profile-button" href="/user" pointer-events="auto"><svg pointer-events="none" id="clear-find-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1.5)"><path d="m3.0000001 14.5c0-3.1424487 3.08132567-4.50000038 6.9999999-4.50000038 3.9186742 0 6.9999999 1.35755168 6.9999999 4.50000038 0 1.615596-1.0761803 2.5000004-2.3000001 2.5000004h-9.39999961c-1.22381984 0-2.30000009-.8844044-2.30000009-2.5000004zm1.8 0c0 .5349234.20087263.7000004.50000009.7000004h9.39999961c.2991275 0 .5000001-.165077.5000001-.7000004 0-1.7450508-2.1675128-2.7000004-5.1999999-2.7000004-3.03248714 0-5.1999999.9549496-5.1999999 2.7000004zm9.0999999-9.5c0 2.15455627-1.7454437 3.9-3.9 3.9-2.15455627 0-3.9-1.74544373-3.9-3.9s1.74544373-3.9 3.9-3.9c2.1545563 0 3.9 1.74544373 3.9 3.9zm-1.8 0c0-1.16044373-.9395563-2.1-2.1-2.1-1.16044373 0-2.1.93955627-2.1 2.1s.93955627 2.1 2.1 2.1c1.1604437 0 2.1-.93955627 2.1-2.1z"/></g></svg></linkbutton>
        </div>

        <div class="pos-relative flex-filler">
            <div class="connection-info center-text">
                <svg class="svg-button" xmlns="http://www.w3.org/2000/svg"><path d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z"/><path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z"/></svg>
                <span class="text-1" id="connection-text">Соединение потеряно</span>
                <svg class="svg-button floatright" id="refresh-connection-button" xmlns="http://www.w3.org/2000/svg" style="transition: all ease-in-out 1s; transform: rotate(0deg)"><g transform="scale(0.04) translate(60, 0)"><path d="M112.156,97.111c72.3-65.4,180.5-66.4,253.8-6.7l-58.1,2.2c-7.5,0.3-13.3,6.5-13,14c0.3,7.3,6.3,13,13.5,13    c0.2,0,0.3,0,0.5,0l89.2-3.3c7.3-0.3,13-6.2,13-13.5v-1c0-0.2,0-0.3,0-0.5v-0.1l0,0l-3.3-88.2c-0.3-7.5-6.6-13.3-14-13    c-7.5,0.3-13.3,6.5-13,14l2.1,55.3c-36.3-29.7-81-46.9-128.8-49.3c-59.2-3-116.1,17.3-160,57.1c-60.4,54.7-86,137.9-66.8,217.1    c1.5,6.2,7,10.3,13.1,10.3c1.1,0,2.1-0.1,3.2-0.4c7.2-1.8,11.7-9.1,9.9-16.3C36.656,218.211,59.056,145.111,112.156,97.111z"/><path d="M462.456,195.511c-1.8-7.2-9.1-11.7-16.3-9.9c-7.2,1.8-11.7,9.1-9.9,16.3c16.9,69.6-5.6,142.7-58.7,190.7    c-37.3,33.7-84.1,50.3-130.7,50.3c-44.5,0-88.9-15.1-124.7-44.9l58.8-5.3c7.4-0.7,12.9-7.2,12.2-14.7s-7.2-12.9-14.7-12.2l-88.9,8    c-7.4,0.7-12.9,7.2-12.2,14.7l8,88.9c0.6,7,6.5,12.3,13.4,12.3c0.4,0,0.8,0,1.2-0.1c7.4-0.7,12.9-7.2,12.2-14.7l-4.8-54.1    c36.3,29.4,80.8,46.5,128.3,48.9c3.8,0.2,7.6,0.3,11.3,0.3c55.1,0,107.5-20.2,148.7-57.4    C456.056,357.911,481.656,274.811,462.456,195.511z"/></g></svg>
            </div>

            <div class="body fullheight fullwidth table-rows scrollable" id="messages-field">
            </div>
        </div>

        <div class="footer messages-footer" id="messages-footer">
            <div class="table-rows fullwidth">
                <div class="table-row text-3 table-columns">
                    <span>Тема: </span>
                    <input class="theme-input flex-filler" id="theme-input" placeholder="Без темы">
                </div>
                <div class="table-row table-columns">
                    <!--Rewrite svg class="svg-button top-filler" id="change-theme-button" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#99A2AD"><g transform="scale(1.2)"><path d="M9.56 4.1h3.54a.9.9 0 110 1.8H9.6c-1 0-1.69 0-2.23.04-.52.05-.82.13-1.05.24a2.6 2.6 0 00-1.14 1.14c-.11.23-.2.53-.24 1.05-.04.54-.04 1.24-.04 2.23v3.8c0 1 0 1.69.04 2.23.05.52.13.82.24 1.05.25.49.65.89 1.14 1.14.23.11.53.2 1.05.24.54.04 1.24.04 2.23.04h3.8c1 0 1.69 0 2.23-.04.52-.05.82-.13 1.05-.24a2.6 2.6 0 001.14-1.14c.11-.23.2-.53.24-1.05.04-.54.04-1.24.04-2.23v-3.5a.9.9 0 111.8 0v3.54c0 .95 0 1.71-.05 2.33a4.5 4.5 0 01-.43 1.73 4.4 4.4 0 01-1.92 1.92 4.5 4.5 0 01-1.73.43c-.62.05-1.38.05-2.33.05H9.56c-.95 0-1.71 0-2.33-.05a4.5 4.5 0 01-1.73-.43 4.4 4.4 0 01-1.92-1.92 4.51 4.51 0 01-.43-1.73c-.05-.62-.05-1.38-.05-2.33v-3.88c0-.95 0-1.71.05-2.33.05-.64.16-1.2.43-1.73A4.4 4.4 0 015.5 4.58a4.51 4.51 0 011.73-.43c.62-.05 1.38-.05 2.33-.05z"/><path d="M19.12 3.33a1.1 1.1 0 111.56 1.55l-.35.35a.4.4 0 01-.57 0l-.99-.99a.4.4 0 010-.56l.35-.35zm-.6 2.57l-.42-.42c-.44-.44-.72-.42-1.13 0l-5.13 5.12c-1.95 1.96-3.19 3.89-2.76 4.32.43.43 2.37-.8 4.32-2.76l5.12-5.13c.44-.44.42-.72 0-1.13z"/></g></svg-->
                    <textarea class="message-input text-1 scrollable input-with-clear" rows="1" id="message-input" tabindex="0" placeholder="Ваше сообщение..."></textarea>
                    <!--Photo svg class="svg-button top-filler" id="attach-photo-button" xmlns="http://www.w3.org/2000/svg" height="35" width="35"><g transform="scale(1.3)" fill="none" stroke="#828a99" stroke-width="1.7"><path d="m14.134 3.65c.853 0 1.46.278 1.988.899.017.019.494.61.66.815.228.281.674.536.945.536h.41c2.419 0 3.863 1.563 3.863 4.05v5.85c0 2.241-2 4.2-4.273 4.2h-11.454c-2.267 0-4.223-1.953-4.223-4.2v-5.85c0-2.496 1.4-4.05 3.814-4.05h.409c.271 0 .717-.255.945-.536.166-.204.643-.796.66-.815.528-.621 1.135-.899 1.988-.899z"/><circle cx="12" cy="12" r="3.85"/></g></svg-->
                    <svg class="svg-button transparent top-filler input-clear" id="message-send-button" xmlns="http://www.w3.org/2000/svg" width="35" height="35"><path transform="scale(1.3)" d="m12.1 7.87v-3.47a1.32 1.32 0 0 1 2.17-1l8.94 7.6a1.32 1.32 0 0 1 .15 1.86l-.15.15-8.94 7.6a1.32 1.32 0 0 1 -2.17-1v-3.45c-4.68.11-8 1.09-9.89 2.87a1.15 1.15 0 0 1 -1.9-1.11c1.53-6.36 5.51-9.76 11.79-10.05zm1.8-2.42v4.2h-.9c-5.3 0-8.72 2.25-10.39 6.86 2.45-1.45 5.92-2.16 10.39-2.16h.9v4.2l7.71-6.55z"/></svg>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// Vk-playlist:
// <svg class="svg-button" id="change-theme-button" viewBox="711 15 24 24" xmlns="http://www.w3.org/2000/svg" height="30" width="30"><g fill="none" fill-rule="evenodd"><path d="m711 15h24v24h-24z"/><path d="m712 31h7m-7-5h12m-12-5h17m-5 10h10m-5-5v10" stroke="#828a99" stroke-linecap="round" stroke-width="2"/></g></svg>
// Plus
// <svg className="svg-button" xmlns="http://www.w3.org/2000/svg" width="40" height="40"><path transform="scale(2.2) translate(-1,-1)" d="M10 3.25c.41 0 .75.34.75.75v5.25H16a.75.75 0 010 1.5h-5.25V16a.75.75 0 01-1.5 0v-5.25H4a.75.75 0 010-1.5h5.25V4c0-.41.34-.75.75-.75z"/></svg>
// Zoom-in
// <svg className="svg-button middle-avatar" id="find-dialogue-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.07) translate(30,30)"><path d="M506.141,477.851L361.689,333.399c65.814-80.075,61.336-198.944-13.451-273.73c-79.559-79.559-209.01-79.559-288.569,0    s-79.559,209.01,0,288.569c74.766,74.766,193.62,79.293,273.73,13.451l144.452,144.452c7.812,7.812,20.477,7.812,28.289,0    C513.953,498.328,513.953,485.663,506.141,477.851z M319.949,319.948c-63.96,63.96-168.03,63.959-231.99,0    c-63.96-63.96-63.96-168.03,0-231.99c63.958-63.957,168.028-63.962,231.99,0C383.909,151.918,383.909,255.988,319.949,319.948z"/><path xmlns="http://www.w3.org/2000/svg"d="M301.897,183.949h-77.94v-77.94c0-11.048-8.956-20.004-20.004-20.004c-11.048,0-20.004,8.956-20.004,20.004v77.94h-77.94    c-11.048,0-20.004,8.956-20.004,20.004c0,11.048,8.956,20.004,20.004,20.004h77.94v77.94c0,11.048,8.956,20.004,20.004,20.004    c11.048,0,20.004-8.956,20.004-20.004v-77.94h77.94c11.048,0,20.004-8.956,20.004-20.004    C321.901,192.905,312.945,183.949,301.897,183.949z"/></g></svg>

/**
 * Renders auth page and "activating" it's js
 *
 * @param element
 * @param app
 * @returns {Promise<void>}
 */
export async function handler(element, app) {
    if (!app.storage.username) {
        await app.goto('/auth');
        return;
    }

    document.title = `${app.name} | Диалоги`;
    element.innerHTML = html;

    // --- Configs
    const dialoguesByRequest = 500;
    const foldersByRequest = 500;
    const messagesByRequest = 10;

    const messagesScrollLoadOffset = 40;
    const dialoguesScrollLoadOffset = 20;

    const controlKeys = [13, 27, 37, 38, 39, 40]; // enter, escape, [arrows]

    const mainFolderName = 'Все входящие';

    // --- HTML elements
    const dialoguePreviewsGroup = document.getElementById('dialogues-listing');
    const dialogueHeader = document.getElementById('dialogue-header-title');
    const dialogueTime = document.getElementById('dialogue-header-time');

    const dialoguesColumn = document.getElementById('dialogues-column');
    const messagesColumn = document.getElementById('messages-column');

    const backToDialoguesButton = document.getElementById('header-title-button');
    const messagesField = document.getElementById('messages-field');
    const messagesFooter = document.getElementById('messages-footer');

    const connectionsInfo = document.getElementsByClassName('connection-info');

    const findInput = document.getElementById('find-input');
    const findButton = document.getElementById('find-dialogue-button');

    const foldersButton = document.getElementById('folders-button');
    const foldersIconArrow = document.getElementById('folder-icon-arrow');

    const themeInput = document.getElementById('theme-input');
    const messageInput = document.getElementById('message-input');
    // --- Plug-elements
    const plugStates = {
        loading: 0,
        end: 1,
        none: 2,
        offline: 3
    };
    // --- Big containers
    const dialogues = {
        storage: [],
        plug: plugStates.loading
    };
    let foundDialogues = [];
    const foldersStates = {
        closed: false,
        opened: true
    };
    const folders = {
        storage: [],
        plug: plugStates.loading,
        state: foldersStates.closed
    };
    const messages = {};
    // --- One-element containers
    const currentDialogue = {
        id: undefined,
        elem: dialoguePreviewsGroup,
        avatar: undefined,
        username: undefined
    };
    const currentFolder = {
        id: 0,
        elem: dialoguePreviewsGroup,
        title: mainFolderName,
    };
    const elemTypes = {
        dialogue: false,
        folder: true
    };
    const selectedElem = {
        id: 0,
        elem: dialoguePreviewsGroup,
        type: undefined
    };
    let createdDialogues = 0;
    let createdMessages = 0;
    let isLostConnection = false;
    // --- Handlebars templates
    const messageBlockInnerHTMLTemplate = Handlebars.compile(`
        <div class="message-block {{ side }}">
            <img src="{{ avatar }}" alt="avatar" class="middle-avatar">
            <div class="floatright text-4 p-m">{{ time }}</div>
            <div class="message-block-title">{{ title }}</div>
            {{#each body}}
                <div id="{{ @index }}" class="message-body">{{ this }}</div>
            {{/each}}
        </div>`);

    const dialogueInnerHTMLTemplate = Handlebars.compile(`
        <img src="{{ avatar }}" alt="avatar" class="middle-avatar">
        <div class="floatright text-4">{{ time }}</div>
        <div class="dialogue-text">
            <div class="text-1">{{ title }}</div>
            <div class="dialogue-body text-2">{{ body }}</div>
        </div>`);

    const folderInnerHTMLTemplate = Handlebars.compile(`
        <svg class="folders-button svg-button middle-avatar bg-transparent floatleft" pointer-events="none" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.05) translate(150,110)"><path d="M448.916,118.259h-162.05c-6.578,0-13.003-2.701-17.44-7.292l-50.563-53.264c-12.154-12.115-28.783-18.443-45.625-18.346    H63.084C28.301,39.356,0,67.657,0,102.439v307.123c0,34.783,28.301,63.084,63.084,63.084h386.064h0.058    c34.764-0.154,62.949-28.59,62.794-63.277V181.342C512,146.559,483.699,118.259,448.916,118.259z M473.417,409.447    c0.058,13.504-10.88,24.558-24.307,24.616H63.084c-13.504,0-24.5-10.996-24.5-24.5V102.439c0-13.504,10.996-24.5,24.5-24.52    H173.74c0.212,0,0.424,0,0.637,0c6.443,0,12.694,2.566,16.899,6.733l50.293,53.013c11.806,12.192,28.32,19.176,45.297,19.176    h162.05c13.504,0,24.5,10.996,24.5,24.5V409.447z"/></g></svg>
        <div class="dialogue-text">
            <div class="text-1">{{ title }}</div>
            <div class="dialogue-body text-2">Диалогов: {{ dialoguesCount }}</div>
        </div>`);

    const dividerHTMLTemplate = Handlebars.compile(`
        <div class="dialogues-listing-divider center-text" id="dialogues-listing-divider">
            <div class="text-4">↓ {{ folder }} ↓</div>
        </div>`);

    // --- Draw some page elements
    // fill username in header
    document.getElementById('profile-link-username').innerText = app.storage.username[0].toUpperCase() + app.storage.username.slice(1) + '@liokor.ru';
    // draw default 'Choose dialogue' page
    drawChooseDialoguePage();

    // --- Connection events
    window.addEventListener('offline', (event) => {
        for (let i = 0; i < connectionsInfo.length; i++) {
            connectionsInfo[i].style.visibility = 'visible';
            connectionsInfo[i].style.top = '0';
            connectionsInfo[i].style.opacity = '1';
        }
        isLostConnection = true;
    });
    if (!navigator.onLine) {
        window.dispatchEvent(new Event('offline')); // trigger window offline event
    }

    window.addEventListener('online', (event) => {
        if (messagesField.scrollTop <= messagesScrollLoadOffset && currentDialogue.username) {
            messagesField.dispatchEvent(new Event('scroll')); // trigger scroll-update messages
        }
        if (dialoguePreviewsGroup.scrollTop + dialoguePreviewsGroup.clientHeight >= dialoguePreviewsGroup.scrollHeight - dialoguesScrollLoadOffset) {
            dialoguePreviewsGroup.dispatchEvent(new Event('scroll')); // trigger scroll-update dialogues
        }
        for (let i = 0; i < connectionsInfo.length; i++) {
            connectionsInfo[i].style.top = '-40px';
            connectionsInfo[i].style.opacity = '0';
            setTimeout(() => { connectionsInfo[i].style.visibility = 'hidden'; }, 500);
        }
        isLostConnection = false;
    });

    // --- Get folders
    folders.storage = folders.storage.concat(await getFolders(-1, foldersByRequest));
    if (isLostConnection) {
        folders.gottenFromSW = true;
        folders.plug = plugStates.offline;
    } else if (folders.storage.length < dialoguesByRequest) {
        folders.plug = plugStates.end;
    }

    console.log(getChildrenHeight(dialoguePreviewsGroup), dialoguePreviewsGroup.clientHeight,dialogues.plug ,plugStates.loading);
    // --- Get dialogues
    do {
        dialogues.storage = dialogues.storage.concat(await getDialogues(-1, dialoguesByRequest));
        if (isLostConnection) {
            dialogues.gottenFromSW = true;
            dialogues.plug = plugStates.offline;
        } else if (dialogues.storage.length < dialoguesByRequest) {
            dialogues.plug = plugStates.end;
        }
        redrawDialogues(folders.storage, dialogues.storage);
    } while (getChildrenHeight(dialoguePreviewsGroup) < dialoguePreviewsGroup.clientHeight && dialogues.plug === plugStates.loading);
    folders.storage.push({ id: 0, title: mainFolderName, dialogues: dialogues.storage});

    // --- Draw dialogues
    redrawDialogues(folders.storage, dialogues.storage);

    // if we have get-parameters in url => go to dialogue
    const gottenUsername = window.location.search.substring(6);
    if (gottenUsername !== '') {
        const dialogue = dialogues.storage.find(item => item.username === gottenUsername);
        if (dialogue) {
            await setActiveDialogue(dialogue.elem, false);
        }
    }

    // create send message event-listener
    document.getElementById('message-send-button').addEventListener('click', async (event) => {
        await sendMessage();
        messageInput.dispatchEvent(new Event('input')); // trigger resize event-listener
    });
    // create send message event-listener by ctrl+Enter
    messageInput.addEventListener('keydown', async (event) => {
        if (controlKeys.includes(event.keyCode)) {
            event.stopPropagation();
        }
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
        // push message and theme into localStorage
        localStorage.setItem(currentDialogue.username + '-theme', themeInput.value);
        localStorage.setItem(currentDialogue.username + '-message', messageInput.value);
        // resize input element
        messageInput.style.height = messageInput.style.minHeight;
        messageInput.style.height = messageInput.scrollHeight + 2 + 'px'; // 2 = border-width * 2
    });

    // --- Folders
    foldersButton.addEventListener('click', (event) => {
        if (folders.state === foldersStates.opened) { // close folders
            foldersIconArrow.style.transform = 'scale(0.03) rotate(0deg) translate(500px, 430px)';
            folders.state = foldersStates.closed;
            folders.storage.forEach((folder) => {
                folder.elem.remove();
            });
            if (currentFolder.id === 0) {
                document.getElementById('dialogues-listing-divider').remove();
            }
            if (selectedElem.type === elemTypes.folder) { // unselect folder
                selectedElem.id = undefined;
            }
            return;
        }
        // open folders
        foldersIconArrow.style.transform = 'scale(0.03) rotate(180deg) translate(-950px, -880px)';
        folders.state = foldersStates.opened;
        if (currentFolder.id === 0) {
            addDialoguesDividerElem();
        }
        folders.storage.forEach((folder) => {
            addFolderToList(folder);
        });
    });

    // --- Find dialogues
    let previousDialoguesPlug = dialogues.plug;
    // create clear-find event-listener
    document.getElementById('clear-find-button').addEventListener('click', (event) => {
        // "load" previous dialogues plug
        dialogues.plug = previousDialoguesPlug;
        findInput.value = '';
        redrawDialogues(folders.storage, dialogues.storage);
    });

    // create find input event-listener
    findInput.addEventListener('input', async (event) => {
        // "save" previous dialogues plug
        if (dialogues.plug !== plugStates.none) {
            previousDialoguesPlug = dialogues.plug;
            dialogues.plug = plugStates.none;
        }
        // get find value
        const findText = findInput.value;
        // "load" previous dialogues plug
        if (findText === '') {
            dialogues.plug = previousDialoguesPlug;
            redrawDialogues(folders.storage, dialogues.storage);
            return;
        }
        // get found dialogues
        foundDialogues = await getDialogues(-1, dialoguesByRequest, findText);
        // set offline plug
        if (isLostConnection) {
            dialogues.gottenFromSW = true;
            dialogues.plug = plugStates.offline;
        }
        redrawDialogues([], foundDialogues);

        if (validateEmail(findText)) { // address valid
            if (dialogues.storage.findIndex(item => item.username === findText) === -1) { // dialogue with accuracy coincidence not found
                addCreateNewDialogueElem(); // draw a button that creates a new dialogue
                findButton.innerHTML = '<path transform="scale(2.2) translate(-1,-1)" d="M10 3.25c.41 0 .75.34.75.75v5.25H16a.75.75 0 010 1.5h-5.25V16a.75.75 0 01-1.5 0v-5.25H4a.75.75 0 010-1.5h5.25V4c0-.41.34-.75.75-.75z"/>';
            } else { // dialogue found => draw arrow on button
                findButton.innerHTML = '<path transform="scale(1.5) translate(2, 0)" d="m12.1 7.87v-3.47a1.32 1.32 0 0 1 2.17-1l8.94 7.6a1.32 1.32 0 0 1 .15 1.86l-.15.15-8.94 7.6a1.32 1.32 0 0 1 -2.17-1v-3.45c-4.68.11-8 1.09-9.89 2.87a1.15 1.15 0 0 1 -1.9-1.11c1.53-6.36 5.51-9.76 11.79-10.05zm1.8-2.42v4.2h-.9c-5.3 0-8.72 2.25-10.39 6.86 2.45-1.45 5.92-2.16 10.39-2.16h.9v4.2l7.71-6.55z"/>';
            }
            return;
        }
        // addres invalid  => draw magnifier on button
        findButton.innerHTML = '<g transform="scale(0.06) translate(40,60)"><path d="M506.141,477.851L361.689,333.399c65.814-80.075,61.336-198.944-13.451-273.73c-79.559-79.559-209.01-79.559-288.569,0    s-79.559,209.01,0,288.569c74.766,74.766,193.62,79.293,273.73,13.451l144.452,144.452c7.812,7.812,20.477,7.812,28.289,0    C513.953,498.328,513.953,485.663,506.141,477.851z M319.949,319.948c-63.96,63.96-168.03,63.959-231.99,0    c-63.96-63.96-63.96-168.03,0-231.99c63.958-63.957,168.028-63.962,231.99,0C383.909,151.918,383.909,255.988,319.949,319.948z"/></g>';
    });

    // create event-listener on 'Enter' in input
    findInput.addEventListener('keydown', async (event) => {
        if (controlKeys.includes(event.keyCode)) {
            event.stopPropagation();
        }
        if (event.keyCode === 27) { // Esc
            findInput.blur();
        } else if (event.keyCode === 13) { // Enter
            const findText = findInput.value;
            if (!validateEmail(findText)) {
                return;
            }
            dialogues.plug = previousDialoguesPlug;
            await addOrSetDialogue(findInput.value);
            findButton.innerHTML = '<g transform="scale(2) translate(0, -2)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g>';
            findInput.value = '';
        }
    });

    // create find-dialogue event-listener
    document.getElementById('find-dialogue-button').addEventListener('click', (event) => {
        if (findInput.value === '') {
            findInput.focus();
            return;
        }
        const newEvent = new Event('keydown');
        newEvent.keyCode = 13;
        findInput.dispatchEvent(newEvent); // trigger enter event-listener
    });

    // create dialogues scroll event-listener to upload new dialogues
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

        if (isLostConnection) {
            dialogues.gottenFromSW = true;
            dialogues.plug = plugStates.offline;
        } else if (newDialogues.length < dialoguesByRequest) {
            dialogues.plug = plugStates.end;
        } else {
            dialogues.plug = plugStates.loading;
        }
        redrawDialoguesPlug();
    });
    */

    // create messages scroll event-listener to upload new messages
    let mutexScrollMessagesEvent = false; // Убейте меня за это пожалусто...
    messagesField.addEventListener('scroll', async (event) => {
        // if it not scrolled to top
        if (messagesField.scrollTop > messagesScrollLoadOffset || !currentDialogue.username) {
            return;
        }

        if (mutexScrollMessagesEvent === true) { // mutex logic
            return;
        }
        mutexScrollMessagesEvent = true; // block mutex

        // messages that we have already
        const dialogueMessages = messages[currentDialogue.username];
        let since = -1;
        if (dialogueMessages.storage.length !== 0) { since = dialogueMessages.storage
                [dialogueMessages.storage.length - 1].id; }
        // Get new messages
        const newMessages = await getMessages(currentDialogue.username, since, messagesByRequest);
        // set messages plug
        messages[currentDialogue.username].gottenFromSW = false;
        if (isLostConnection) {
            messages[currentDialogue.username].gottenFromSW = true;
            messages[currentDialogue.username].plug = plugStates.offline;
        } else if (newMessages.length < messagesByRequest) {
            messages[currentDialogue.username].plug = plugStates.end;
        } else {
            messages[currentDialogue.username].plug = plugStates.loading;
        }

        // get height for scroll to previous place at end of function
        const heightToBottom = getChildrenHeight(messagesField) - messagesField.scrollTop;

        convertMessagesToBlocks(newMessages);
        convertTimesToStr(newMessages);
        messages[currentDialogue.username].storage = dialogueMessages.storage.concat(newMessages);
        newMessages.forEach((message) => {
            addMessageToField(message);
        });

        // Scroll to previous place
        messagesField.scrollTop = getChildrenHeight(messagesField) - heightToBottom;

        redrawMessagesPlug(messages[currentDialogue.username].plug);

        mutexScrollMessagesEvent = false; // unblock mutex
    });

    backToDialoguesButton.addEventListener('click', (event) => {
        unsetActiveDialogue();
    });

    // Imitate loading work... Simple clicker-game for user
    for (let i = 0; i < connectionsInfo.length; i++) {
        const refreshButton = connectionsInfo[i].lastElementChild;
        const connectionText = refreshButton.previousElementSibling;
        connectionsInfo[i].addEventListener('click', (event) => {
            refreshButton.style.transform = 'rotate(' + (Number(refreshButton.style.transform.substring(7, refreshButton.style.transform.length - 4)) + 360) + 'deg)';
            setTimeout(() => { connectionText.innerText += '.'; }, 300);
            setTimeout(() => { connectionText.innerText += '.'; }, 600);
            setTimeout(() => { connectionText.innerText += '.'; }, 900);
            setTimeout(() => { connectionText.innerText = connectionText.innerText.substring(0, connectionText.innerText.length - 3); }, 1500);
        });
    }

    // ------ Page navigation using keys arrows + enter + escape
    document.addEventListener('keydown', (event) => {
        if (controlKeys.includes(event.keyCode)) {
            event.stopPropagation();
            event.preventDefault();
        }
        switch (event.keyCode) {
        case 38: // up arrow
            let previousElem = selectedElem.elem.previousElementSibling;
            if (!selectedElem.id || !previousElem) { // if is in dialogues list (check "overflow")
                return;
            }
            if (previousElem.tagName === 'DIV') {
                previousElem = previousElem.previousElementSibling;
            }
            if (previousElem) {
                selectElem(previousElem);
            }
            break;
        case 40: // down arrow
            if (typeof selectedElem.type === 'undefined') {
                console.log('SELECT');
                selectElem(dialoguePreviewsGroup.firstElementChild);
                return;
            }
            let nextElem = selectedElem.elem.nextElementSibling;
            if (!nextElem) {
                return;
            }
            if (nextElem.tagName === 'DIV') { // if is in dialogues list (check "overflow")
                nextElem = nextElem.nextElementSibling;
            }
            if (nextElem) {
                selectElem(nextElem);
            }
            break;
        case 39: // right arrow
        case 13: // enter
            if (typeof selectedElem.id !== 'undefined') {
                if (selectedElem.type === elemTypes.dialogue) {
                    setActiveDialogue(selectedElem.elem);
                } else {
                    setActiveFolder(selectedElem.elem);
                }
            }
            break;
        case 37: // left arrow
        case 27: // escape
            unsetActiveDialogue();
            break;
        }
    });

    /**
     * Set element selected
     *
     * @param elem element to select
     */
    function selectElem(element) {
        if (selectedElem.elem === element) {
            return;
        }
        selectedElem.elem.classList.remove('selected');
        selectedElem.elem = element;
        selectedElem.elem.classList.add('selected');
        if (element.classList.contains('folder')) {
            selectedElem.id = Number(selectedElem.elem.id.substring(7)); // length of 'folder-'
            selectedElem.type = elemTypes.folder;
            return;
        }
        selectedElem.id = Number(selectedElem.elem.id.substring(9)); // length of 'dialogue-'
        selectedElem.type = elemTypes.dialogue;
    }

    /**
     * Clear dialogues list and show new
     *
     * @param {object} folders folders to redraw
     * @param {object} dialogues dialogues to redraw
     */
    function redrawDialogues(foldersList, dialogues) {
        dialoguePreviewsGroup.innerHTML = '';

        if (folders.state === foldersStates.opened) {
            addDialoguesDividerElem();
            foldersList.forEach((folder) => {
                addFolderToList(folder);
            });
        }
        if (typeof currentFolder.id === 'undefined') {
            dialogues.forEach((dialogue) => {
                addDialogueToList(dialogue);
            });
        } else {
            const folder = foldersList.find(item => item.id === currentFolder.id);
            if (!folder) {
                return;
            }
            folder.dialogues.forEach((dialogue) => {
                addDialogueToList(dialogue);
            });
        }


        redrawDialoguesPlug();
    }

    /**
     * Delete dialogues plug and draw new
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
        case plugStates.offline:
            addOfflineEndDialoguesElem(dialoguePreviewsGroup, 'dialogues-plug');
            break;
        }
    }

    /**
     * Delete messages plug and draw new
     *
     * @param plug
     */
    function redrawMessagesPlug(plug) {
        const prevPlug = document.getElementById('messages-plug');
        if (prevPlug) { prevPlug.remove(); }

        switch (plug) {
        case plugStates.end:
            addEndMessagesElem(messagesField, 'messages-plug');
            break;
        case plugStates.loading:
            addLoadingElem(messagesField, true, 'flex-filler', 'messages-plug');
            break;
        case plugStates.none:
            addFlexFillerElem(messagesField, 'messages-plug');
            break;
        case plugStates.offline:
            addOfflineEndMessagesElem(messagesField, 'messages-plug');
            break;
        }
    }

    /**
     * Converts messages to blocks
     *
     * @param messages to convert to blocks
     */
    function convertMessagesToBlocks(messages) {
        messages.forEach((elem) => {
            elem.time = new Date(elem.time);
            elem.body = [elem.body];
        });

        let previousElem = messages[messages.length - 1];
        messages.slice(0, -1).reverse().forEach((elem, id, object) => {
            if (previousElem.sender === elem.sender && previousElem.title === elem.title && (elem.time - previousElem.time <= 1000 * 60 * 10)) { // 1000ms * 60(seconds in minute) * 5(minutes)
                messages[object.length - id].body.push(elem.body[0]);
                messages.splice(object.length - id - 1, 1);
            }
            previousElem = elem;
        });
    }

    /**
     * Converts DateTime format to string in all array elements
     *
     * @param array to replace time in
     */
    function convertTimesToStr(array) {
        array.forEach((elem) => {
            const date = new Date(elem.time);
            const now = new Date();
            if (date.getDate() === now.getDate()) { // today
                elem.time = '';
            } else if (date.getDate() === now.getDate() - 1) { // yesterday
                elem.time = 'Вчера ';
            } else { // long time ago
                elem.time = date.getDate() + '.' + String(date.getMonth()).padStart(2, '0') + ' ';
            }
            elem.time += date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0'); // add time
        });
    }

    /**
     * Sets avatarUrl to default way for dialogue
     *
     * @param dialogue to replace avatar in
     */
    function convertAvatarUrlToDefault(dialogue) {
        if (dialogue.avatarUrl) {
            return;
        }
        const tail = dialogue.username.split('@')[1];
        switch (tail) { // get address after '@'
        case 'mail.ru':
            dialogue.avatarUrl = '/images/mail.png';
            break;
        case 'gmail.com':
            dialogue.avatarUrl = '/images/gmail.png';
            break;
        case 'yandex.ru':
        case 'ya.ru':
            dialogue.avatarUrl = '/images/yandex.png';
            break;
        default:
            dialogue.avatarUrl = app.defaultAvatarUrl;
        }
    }

    /**
     * Get new folders list
     *
     * @param since
     * @param amount
     * @param find
     * @returns {Promise<*>}
     */
    async function getFolders(since, amount) {
        let path = `/email/folders`;//?last=${since}&amount=${amount}`;
        //if (find && find !== '') { path += '&find=' + find; }
        const response = await app.apiGet(path);
        if (!response.ok) {
            if (response.status !== 418) { // Empty response from SW (offline mode)
                app.messageError(`Ошибка ${response.status}`, 'Не удалось получить список папок!');
            }
            return [];
        }
        const folders = await response.json();
        if (!folders) {
            return [];
        }
        return folders;
    }

    /**
     * Get new dialogues list
     *
     * @param since
     * @param amount
     * @param find
     * @param folderId
     * @returns {Promise<*>}
     */
    async function getDialogues(since, amount, find, folderId = 0) {
        let path = `/email/dialogues?last=${since}&amount=${amount}`;
        if (find && find !== '') {
            path += '&find=' + find;
        }
        if (folderId) {
            path += '&folder=' + folderId;
        }
        const response = await app.apiGet(path);
        if (!response.ok) {
            if (response.status !== 418) { // Empty response from SW (offline mode)
                app.messageError(`Ошибка ${response.status}`, 'Не удалось получить список диалогов!');
            }
            return [];
        }
        const dialogues = await response.json();
        if (!dialogues) {
            return [];
        }
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
            // Просто открыт новый пустой диалог
            return [];
        }
        const messages = await response.json();
        if (!messages) {
            return [];
        }
        return messages;
    }

    /**
     * Add folder on bottom of dialogues listing
     *
     * @param {object} folder folder to add in dialogues list
     */
    function addFolderToList(folder) {
        // create dialogue HTML-element
        folder.elem = document.createElement('li');
        folder.elem.id = 'folder-' + folder.id;
        folder.elem.classList.add('listing-button', 'folder');
        if (folder.id === currentFolder.id) {
            folder.elem.classList.add('active');
            currentFolder.elem = folder.elem;
        }
        if (folder.id === selectedElem.id && selectedElem.type === elemTypes.folder) {
            folder.elem.classList.add('selected');
            selectedElem.elem = folder.elem;
        }
        if (folder.id === 0) { // if it's main folder
            folder.elem.innerHTML = `
                <svg class="folders-button svg-button middle-avatar bg-transparent floatleft" pointer-events="none" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.065) translate(90,10)"><path d="M340.80080180740356,203.6081974435188 h-123.02250294685365 c-4.993779848098755,0 -9.871407626152038,-2.050501576423645 -13.239817657470704,-5.535822841644287 l-38.38560207653046,-40.4361036529541 c-9.226877511978149,-9.197270121574402 -21.851013281822205,-14.00125900554657 -34.63685095310211,-13.927620111465455 H47.89109272384644 C21.485096302986143,143.70789167359845 0,165.1929879765846 0,191.59822523358838 v233.156681101799 c0,26.40599642086029 21.485096302986143,47.89109272384644 47.89109272384644,47.89109272384644 h293.0858350982666 h0.04403150367736817 c26.39157230758667,-0.11691123390197757 47.78860560321808,-21.70449465751648 47.67093520545959,-48.03761134815216 V251.49853100350873 C388.69189453125,225.09253458264843 367.2067982282639,203.6081974435188 340.80080180740356,203.6081974435188 zM359.4010754556656,424.66760249188917 c0.04403150367736817,10.251748718261718 -8.259702758789063,18.643545988082884 -18.45299586009979,18.687577491760255 H47.89109272384644 c-10.251748718261718,0 -18.599514484405518,-8.3477657661438 -18.599514484405518,-18.599514484405518 V191.59822523358838 c0,-10.251748718261718 8.3477657661438,-18.599514484405518 18.599514484405518,-18.614697761535645 H131.89712842941285 c0.1609427375793457,0 0.3218854751586914,0 0.48358737659454354,0 c4.891292727470398,0 9.636825994491577,1.9480144557952879 12.82911001110077,5.111450245857239 l38.18062783527374,40.24555352497101 c8.96268848991394,9.25572573852539 21.499520416259767,14.557726112365721 34.38784520816803,14.557726112365721 h123.02250294685365 c10.251748718261718,0 18.599514484405518,8.3477657661438 18.599514484405518,18.599514484405518 V424.66760249188917 z"/><path d="M 79.72623 131.64013 C 82.73375 123.36945 87.7321 118.64883 96.77176 118.33273 C 105.81142 118.01664 183.46435 118.20887 190.12869 120.04583 C 196.79302 121.88278 238.50963 168.42677 251.30868 173.09609 C 264.10774 177.76541 389.39087 174.96474 395.48077 175.83164 C 401.57067 176.69854 410.44077 182.36042 411.03479 192.88673 C 411.62881 203.41304 413.25029 354.17958 412.89442 371.12236 C 412.53855 388.06514 399.04484 386.91183 399.12243 386.95197 C 399.20002 386.99211 398.52843 415.44312 399.20272 415.87927 C 399.87701 416.31542 440.00224 411.49112 440.71397 377.88927 C 441.4257 344.28742 440.59625 211.13798 439.96209 183.90432 C 439.32793 156.67066 421.64409 147.53851 403.11998 147.06221 C 384.59587 146.58591 275.94556 150.90709 263.1636 146.39581 C 250.38164 141.88453 208.99824 93.8881 195.98985 90.1287 C 182.98146 86.3693 97.12204 89.42811 86.57864000000001 88.4156 C 76.03523 87.40308 50.48841 106.46071 49.73653 131.27274"/></g></svg>
                <div class="text-1 text-bigger dialogue-text centered">${mainFolderName}</div>`;
        } else {
            folder.elem.innerHTML = folderInnerHTMLTemplate({
                        title: folder.title, dialoguesCount: folder.dialoguesCount });
        }
        dialoguePreviewsGroup.insertBefore(folder.elem, dialoguePreviewsGroup.firstChild);

        // create Event-listener on folder element to activate it
        folder.elem.addEventListener('click', async (event) => {
            await setActiveFolder(event.currentTarget);
        });
        // create Event-listener on folder element to select it
        folder.elem.addEventListener('mousemove', (event) => {
            selectElem(event.currentTarget);
        });
    }

    /**
     * Add dialogue on bottom of dialogues listing
     *
     * @param {object} dialogue dialogue to add in dialogues list
     */
    function addDialogueToList(dialogue) {
        convertAvatarUrlToDefault(dialogue);
        // create dialogue HTML-element
        dialogue.elem = document.createElement('li');
        dialogue.elem.id = 'dialogue-' + dialogue.id;
        dialogue.elem.classList.add('listing-button');
        if (dialogue.username === currentDialogue.username) {
            dialogue.elem.classList.add('active');
            currentDialogue.elem = dialogue.elem;
        }
        if (dialogue.id === selectedElem.id && selectedElem.type === elemTypes.dialogue) {
            dialogue.elem.classList.add('selected');
            selectedElem.elem = dialogue.elem;
        }
        dialogue.elem.innerHTML = dialogueInnerHTMLTemplate(
            { avatar: dialogue.avatarUrl, time: dialogue.time, title: dialogue.username, body: dialogue.body });
        dialoguePreviewsGroup.appendChild(dialogue.elem);

        // create Event-listener on dialogue element to activate it
        dialogue.elem.addEventListener('click', async (event) => {
            await setActiveDialogue(event.currentTarget);
        });
        // create Event-listener on dialogue element to select it
        dialogue.elem.addEventListener('mousemove', (event) => {
            selectElem(event.currentTarget);
        });
    }

    /**
     * Add divider between folders and dialogues
     */
    function addDialoguesDividerElem() {
        const elem = document.createElement('div');
        elem.id = 'dialogues-listing-divider';
        elem.classList.add('dialogues-listing-divider', 'center-text');
        elem.innerHTML = dividerHTMLTemplate({ folder: currentFolder.title });
        dialoguePreviewsGroup.insertBefore(elem, dialoguePreviewsGroup.firstChild);
    }

    /**
     * Add create new dialogue element on top of dialogues listing
     */
    function addCreateNewDialogueElem() {
        // create dialogue HTML-element
        const elem = document.createElement('li');
        elem.id = 'new-dialogue-button';
        elem.classList.add('listing-button', 'center-text', 'p-xs');
        elem.innerHTML = '<svg class="plus-button" id="find-dialogue-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(3) translate(1, -2)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g></svg>';
        dialoguePreviewsGroup.insertBefore(elem, dialoguePreviewsGroup.firstChild);

        // create Event-listener on element
        elem.addEventListener('click', async (event) => {
            await addOrSetDialogue(findInput.value);
            findInput.value = '';
        });
    }

    /**
     * Set folder active and draw it dialogues
     *
     * @param currentElem
     * @param pushState
     */
    async function setActiveFolder(currentElem, pushState = true) {
        if (currentElem.id === 'folder-' + currentFolder.id) {
            return;
        }
        currentFolder.id = currentElem.id.substr(7); // length of 'folder-' ;
        currentFolder.elem.classList.remove('active'); // "deactivate" previous folder
        currentFolder.elem = currentElem;
        currentFolder.elem.classList.add('active'); // "activate" current folder

        // get folder data
        const folderIndex = folders.storage.findIndex((item) => item.id === Number(currentFolder.id)); // get folder data
        let folder = folders.storage[folderIndex];

        // update currentFolder data
        currentFolder.id = folder.id;
        currentFolder.title = folder.title;

        // get folder dialogues
        if (!folder.dialogues || folder.gottenFromSW) {
            folders.storage[folderIndex].dialogues = await getDialogues(-1, dialoguesByRequest, '', currentFolder.id);
            folders.storage[folderIndex].gottenFromSW = isLostConnection;
            folder = folders.storage[folderIndex];
        }

        if (folder.gottenFromSW) {
            folders.storage[folderIndex].plug = plugStates.offline;
        } else if (folders.storage[folderIndex].length < dialoguesByRequest) {
            folders.storage[folderIndex].plug = plugStates.end;
        } else {
            folders.storage[folderIndex].plug = plugStates.loading;
        }

        // set folder url
        const currentPath = new URL(window.location.href);
        currentPath.searchParams.set('folder', folder.id);
        if (pushState) {
            history.pushState(null, null, currentPath.toString());
        }

        redrawDialogues(folders.storage, dialogues.storage);
    }

    /**
     * Set dialogue active and draw it
     *
     * @param currentElem
     * @param pushState
     */
    async function setActiveDialogue(currentElem, pushState = true) {
        // For mobile version. Go to messages
        dialoguesColumn.classList.remove('mobile-fullwidth');
        messagesColumn.classList.add('mobile-fullwidth');

        if (currentElem.id === 'dialogue-' + currentDialogue.id) {
            return;
        }
        currentDialogue.id = currentElem.id.substr(9); // length of 'dialogue-' ;

        messagesFooter.style.display = 'flex'; // show message input

        currentDialogue.elem.classList.remove('active'); // "deactivate" previous dialogue
        currentDialogue.elem = currentElem;
        currentDialogue.elem.classList.add('active'); // "activate" current dialogue

        // update messages header
        const dialogue = dialogues.storage.find((item) => item.id === Number(currentDialogue.id)); // get dialogue data
        dialogueHeader.innerText = dialogue.username;
        dialogueTime.innerText = dialogue.time;

        // push old message and theme into localStorage
        localStorage.setItem(currentDialogue.username + '-theme', themeInput.value);
        localStorage.setItem(currentDialogue.username + '-message', messageInput.value);

        // update currentDialogue data
        currentDialogue.id = dialogue.id;
        currentDialogue.avatar = dialogue.avatarUrl;
        currentDialogue.username = dialogue.username;

        // get new message and theme from localStorage
        const theme = localStorage.getItem(currentDialogue.username + '-theme');
        const message = localStorage.getItem(currentDialogue.username + '-message');
        themeInput.value = theme;
        messageInput.value = message;

        // get dialogue messages
        if (!messages[dialogue.username] || messages[dialogue.username].gottenFromSW) {
            if (!messages[dialogue.username]) {
                messages[dialogue.username] = {storage: []};
            }
            do {
                const dialogueMessages = messages[dialogue.username];
                let since = -1;
                if (dialogueMessages && dialogueMessages.storage.length !== 0) { since = dialogueMessages.storage[dialogueMessages.storage.length - 1].id; }
                const newMessages = await getMessages(dialogue.username, since, messagesByRequest);
                messages[dialogue.username].gottenFromSW = isLostConnection;

                messages[dialogue.username].plug = plugStates.loading;
                if (messages[dialogue.username].gottenFromSW) {
                    messages[dialogue.username].plug = plugStates.offline;
                } else if (newMessages.length < messagesByRequest) {
                    messages[dialogue.username].plug = plugStates.end;
                }

                convertMessagesToBlocks(newMessages);
                convertTimesToStr(newMessages);
                messages[dialogue.username].storage = messages[dialogue.username].storage.concat(newMessages);
                showDialogue(dialogue.username);
                console.log(getChildrenHeight(messagesField), messagesField.clientHeight , messages[dialogue.username].plug, plugStates.loading);
            } while (getChildrenHeight(messagesField) < messagesField.clientHeight && messages[dialogue.username].plug === plugStates.loading);
        }

        // set dialogue url
        const currentPath = new URL(window.location.href);
        currentPath.searchParams.set('with', currentDialogue.username);
        if (pushState) {
            history.pushState(null, null, currentPath.toString());
        }
        document.title = `${app.name} | ${currentDialogue.username}`;

        showDialogue(dialogue.username);
    }

    /**
     * Unset active dialogue and draw default page
     */
    async function unsetActiveDialogue() {
        // For mobile version. Go to dialogues
        dialoguesColumn.classList.add('mobile-fullwidth');
        messagesColumn.classList.remove('mobile-fullwidth');

        // "Deactivate" previous dialogue
        currentDialogue.elem.classList.remove('active');

        // update messages header
        dialogueHeader.innerText = '';
        dialogueTime.innerText = 'Выберите диалог';

        // push old message and theme into localStorage
        localStorage.setItem(currentDialogue.username + '-theme', themeInput.value);
        localStorage.setItem(currentDialogue.username + '-message', messageInput.value);

        // update currentDialogue data
        currentDialogue.id = undefined;
        currentDialogue.avatar = undefined;
        currentDialogue.username = undefined;

        // set default url
        const currentPath = window.location.pathname;
        history.pushState(null, null, currentPath);
        document.title = `${app.name} | Диалоги`;

        drawChooseDialoguePage();
    }

    /**
     * @param username
     */
    async function addOrSetDialogue(username) {
        if (username === '') {
            return;
        }
        themeInput.focus();
        const foundDialogue = dialogues.storage.find(item => item.username === username);
        if (foundDialogue) {
            await setActiveDialogue(foundDialogue.elem);
            redrawDialogues(folders.storage, dialogues.storage);
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
        redrawDialogues(folders.storage, dialogues.storage);
        scrollToTop(dialoguePreviewsGroup);
    }

    /**
     * draw all dialogue messages
     *
     * @param username
     */
    function showDialogue(username) {
        messagesField.innerHTML = '';

        if (messages[username].storage.length !== 0) {
            // create bottom message block
            const messageBlock = messages[username].storage[0];
            addMessageToField(messageBlock);

            // set default theme of message
            if (messageBlock.sender !== app.storage.username && messageBlock.sender !== app.storage.username + '@liokor.ru') {
                if (messageBlock.title.substr(0, 3).toLowerCase() === 're:') {
                    const { num, theme } = messageBlock.title.substr(3).split(']');
                    themeInput.value = 'Re[' + (Number(num) + 1) + ']: ' + theme;
                } else if (messageBlock.title.substr(0, 3).toLowerCase() === 're[') {
                    themeInput.value = messageBlock.title;
                } else {
                    themeInput.value = 'Re: ' + messageBlock.title;
                }
            } else {
                themeInput.value = messageBlock.title;
            }

            // create other messages blocks
            messages[username].storage.slice(1).forEach((messageBlock) => {
                addMessageToField(messageBlock);
            });
        }
        redrawMessagesPlug(messages[username].plug);
        scrollToBottom(messagesField);
        messageInput.focus();
    }

    /**
     * Show default page with 'Choose dialogue or create new'
     */
    function drawChooseDialoguePage() {
        messagesField.innerHTML = `
                <div class="flex-filler center-text"></div>
                <div class="center-text">
                    <svg class="svg-button" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z"></path><path d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z"></path></svg>
                    <div class="text-1">
                        Выберите диалог <br>
                        или создайте новый
                    </div>
                </div>
                <div class="flex-filler"></div>`;
        messagesFooter.style.display = 'none';
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
                body: messageBlock.body
            });
        } else {
            messageBlockElem.classList.add('message-block-full', 'left-block');
            messageBlockElem.innerHTML = messageBlockInnerHTMLTemplate({
                side: 'not-your',
                avatar: currentDialogue.avatar,
                time: messageBlock.time,
                title: messageBlock.title,
                body: messageBlock.body
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
        if (message === '') {
            return;
        }

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
        const date = new Date();
        return date.getHours() + ':' + String(date.getMinutes()).padStart(2, '0');
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
                    <svg class="svg-button centered" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z"></path><path d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z" fill="currentColor"></path></svg>
                    <div class="text-1">Это начало истории сообщений</div>`;
        parent.insertBefore(elem, parent.firstChild);
    }

    /**
     * Add plug-end of messages offline element
     *
     * @param parent
     * @param id
     */
    function addOfflineEndMessagesElem(parent, id) {
        const elem = document.createElement('div');
        elem.classList.add('center-text', 'top-filler');
        elem.id = id;
        elem.innerHTML = `
                    <svg class="svg-button centered" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><g transform="scale(2.4)"><path d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z"/><path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z"/></g></svg>
                    <div class="text-1">Это все загруженные сообщения</div>`;
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
     * Add plug-end of dialogues offline element
     *
     * @param parent
     * @param id
     */
    function addOfflineEndDialoguesElem(parent, id) {
        const elem = document.createElement('div');
        elem.classList.add('center-text', 'empty-dialogue');
        elem.id = id;
        elem.innerHTML = `
                    <svg class="svg-button centered" pointer-events="none" width="50" height="30" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1.5)"><path d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z"/><path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z"/></g></svg>
                    <div class="text-1">Это все загруженные диалоги</div>`;
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
        elem.childNodes.forEach((child) => { height += child.clientHeight; });
        return height;
    }
}
