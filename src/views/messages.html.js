import Handlebars from 'handlebars/dist/cjs/handlebars';

import { validateEmail } from '../modules/validators';
import { Listing, plugStates } from '../components/listing';
import PaginatedGetter from '../modules/paginatedGetter';
import setDraggable from '../components/dragAndDropper';
import ParsedDate from '../modules/parsedDate';
import convertAvatarUrlToDefault from '../modules/defaultAvatars';

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

            <div class="body fullheight fullwidth table-rows scrollable" id="messages-listing">
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

    const mainFolderName = 'Общая';

    // --- HTML elements
    const dialoguesListingElem = document.getElementById('dialogues-listing');
    const messagesListingElem = document.getElementById('messages-listing');

    const dialogueHeader = document.getElementById('dialogue-header-title');
    const dialogueTime = document.getElementById('dialogue-header-time');

    const dialoguesColumn = document.getElementById('dialogues-column');
    const messagesColumn = document.getElementById('messages-column');

    const backToDialoguesButton = document.getElementById('header-title-button');
    const messagesFooter = document.getElementById('messages-footer');

    const connectionsInfo = document.getElementsByClassName('connection-info');

    const findInput = document.getElementById('find-input');
    const findButton = document.getElementById('find-dialogue-button');

    const foldersButton = document.getElementById('folders-button');
    const foldersIconArrow = document.getElementById('folder-icon-arrow');

    const themeInput = document.getElementById('theme-input');
    const messageInput = document.getElementById('message-input');

    // --- Network getters
    const foldersGetter = new PaginatedGetter(app.apiUrl + '/email/folders', 'since', -1, 'amount', foldersByRequest, 'id');
    foldersGetter.onErrorHandler = (response) => {
        if (response.status !== 418) { // Empty response from SW (offline mode)
            app.messages.error(`Ошибка ${response.status}`, 'Не удалось получить список папок!');
        }
    };

    // --- One-element containers
    let createdDialogues = 0;
    let isLostConnection = false;

    // --- Handlebars templates
    const messageBlockInnerHTMLTemplate = Handlebars.compile(`
        <div class="message-block {{ side }}">
            <img src={{ avatar }} alt="avatar" class="middle-avatar">
            <div class="floatright text-4 p-m">
                <div>{{ time }}</div>
                <svg class="floatright svg-button message-status" pointer-events="none" xmlns="http://www.w3.org/2000/svg">
                    {{#if isStated}}
                        {{#if isDelivered}}
                            <g transform="scale(0.05)"><path d="M192.485,0C86.173,0,0,86.173,0,192.485S86.173,384.97,192.485,384.97c106.3,0,192.485-86.185,192.485-192.485    C384.97,86.173,298.785,0,192.485,0z M192.485,360.909c-93.018,0-168.424-75.406-168.424-168.424S99.467,24.061,192.485,24.061    s168.424,75.406,168.424,168.424S285.503,360.909,192.485,360.909z"/><path d="M280.306,125.031L156.538,247.692l-51.502-50.479c-4.74-4.704-12.439-4.704-17.179,0c-4.752,4.704-4.752,12.319,0,17.011    l60.139,58.936c4.932,4.343,12.307,4.824,17.179,0l132.321-131.118c4.74-4.692,4.74-12.319,0-17.011    C292.745,120.339,285.058,120.339,280.306,125.031z"/></g>
                        {{else}}
                            <g transform="scale(0.04)"><path d="M505.403,406.394L295.389,58.102c-8.274-13.721-23.367-22.245-39.39-22.245c-16.023,0-31.116,8.524-39.391,22.246    L6.595,406.394c-8.551,14.182-8.804,31.95-0.661,46.37c8.145,14.42,23.491,23.378,40.051,23.378h420.028    c16.56,0,31.907-8.958,40.052-23.379C514.208,438.342,513.955,420.574,505.403,406.394z M477.039,436.372    c-2.242,3.969-6.467,6.436-11.026,6.436H45.985c-4.559,0-8.784-2.466-11.025-6.435c-2.242-3.97-2.172-8.862,0.181-12.765    L245.156,75.316c2.278-3.777,6.433-6.124,10.844-6.124c4.41,0,8.565,2.347,10.843,6.124l210.013,348.292    C479.211,427.512,479.281,432.403,477.039,436.372z"/><path d="M256.154,173.005c-12.68,0-22.576,6.804-22.576,18.866c0,36.802,4.329,89.686,4.329,126.489    c0.001,9.587,8.352,13.607,18.248,13.607c7.422,0,17.937-4.02,17.937-13.607c0-36.802,4.329-89.686,4.329-126.489    C278.421,179.81,268.216,173.005,256.154,173.005z"/><path xmlns="http://www.w3.org/2000/svg" d="M256.465,353.306c-13.607,0-23.814,10.824-23.814,23.814c0,12.68,10.206,23.814,23.814,23.814    c12.68,0,23.505-11.134,23.505-23.814C279.97,364.13,269.144,353.306,256.465,353.306z"/></g>
                        {{/if}}
                    {{/if}}
                </svg>
            </div>
            <div class="message-block-title">{{ title }}</div>
            {{#each body}}
                <div id={{ @index }} class="message-body">{{ this }}</div>
            {{/each}}
        </div>`);

    const dialogueInnerHTMLTemplate = Handlebars.compile(`
        <img src={{ avatar }} alt="avatar" class="middle-avatar">
        <div class="floatright text-4">
            <div>{{ time }}</div>
            {{#if newMessages}}
                <div class="dialogue-status floatright">{{ newMessages }}</div>
            {{/if}}
        </div>
        <div class="dialogue-text">
            <div class="text-1">{{ title }}</div>
            <div class="dialogue-body text-2">{{ body }}</div>
        </div>`);

    const folderInnerHTMLTemplate = Handlebars.compile(`
        <svg class="folders-button svg-button middle-avatar bg-transparent floatleft" pointer-events="none" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.05) translate(150,110)"><path d="M448.916,118.259h-162.05c-6.578,0-13.003-2.701-17.44-7.292l-50.563-53.264c-12.154-12.115-28.783-18.443-45.625-18.346    H63.084C28.301,39.356,0,67.657,0,102.439v307.123c0,34.783,28.301,63.084,63.084,63.084h386.064h0.058    c34.764-0.154,62.949-28.59,62.794-63.277V181.342C512,146.559,483.699,118.259,448.916,118.259z M473.417,409.447    c0.058,13.504-10.88,24.558-24.307,24.616H63.084c-13.504,0-24.5-10.996-24.5-24.5V102.439c0-13.504,10.996-24.5,24.5-24.52    H173.74c0.212,0,0.424,0,0.637,0c6.443,0,12.694,2.566,16.899,6.733l50.293,53.013c11.806,12.192,28.32,19.176,45.297,19.176    h162.05c13.504,0,24.5,10.996,24.5,24.5V409.447z"/></g></svg>
        <div class="dialogue-text centered">
            <div class="text-1">{{ title }}</div>
            <!--div class="dialogue-body text-2">Диалогов: {{ dialoguesCount }}</div-->
        </div>`);

    const dividerHTMLTemplate = Handlebars.compile(`
        <div class="dialogues-listing-divider center-text" id="dialogues-listing-divider">
            <div class="text-4">↓ {{ folder }} ↓</div>
        </div>`);

    // --- Draw some page elements
    // fill username in header
    document.getElementById('profile-link-username').innerText = app.storage.username[0].toUpperCase() + app.storage.username.slice(1) + '@liokor.ru';

    // --- Listings create and configure
    // Create folders listing
    const foldersListing = new Listing(dialoguesListingElem);
    // create Event-listener on folder element to activate it
    foldersListing.setClickElementHandler(async (event) => {
        foldersListing.clearSelected();
        dialoguesListing.clearSelected();
        await foldersListing.setActive(event.currentTarget.id);
    });
    // create Event-listener on folder element to reset selected
    foldersListing.setMousemoveElementHandler(async (event) => {
        foldersListing.clearSelected();
        dialoguesListing.clearSelected();
        await foldersListing.addSelected(event.currentTarget.id);
    });

    messagesListingElem.innerHTML = `
        <div class="fullheight table-rows">
            <div class="flex-filler center-text"></div>
            <div class="center-text">
                <svg class="svg-button" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z"></path><path d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z"></path></svg>
                <div class="text-1">
                    Выберите диалог <br>
                    или создайте новый
                </div>
            </div>
            <div class="flex-filler"></div>
        </div>`;

    // --- Get folders
    // create main folder
    const elem = newElem(`<svg class="folders-button svg-button middle-avatar bg-transparent floatleft" pointer-events="none" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.065) translate(90,10)"><path d="M340.80080180740356,203.6081974435188 h-123.02250294685365 c-4.993779848098755,0 -9.871407626152038,-2.050501576423645 -13.239817657470704,-5.535822841644287 l-38.38560207653046,-40.4361036529541 c-9.226877511978149,-9.197270121574402 -21.851013281822205,-14.00125900554657 -34.63685095310211,-13.927620111465455 H47.89109272384644 C21.485096302986143,143.70789167359845 0,165.1929879765846 0,191.59822523358838 v233.156681101799 c0,26.40599642086029 21.485096302986143,47.89109272384644 47.89109272384644,47.89109272384644 h293.0858350982666 h0.04403150367736817 c26.39157230758667,-0.11691123390197757 47.78860560321808,-21.70449465751648 47.67093520545959,-48.03761134815216 V251.49853100350873 C388.69189453125,225.09253458264843 367.2067982282639,203.6081974435188 340.80080180740356,203.6081974435188 zM359.4010754556656,424.66760249188917 c0.04403150367736817,10.251748718261718 -8.259702758789063,18.643545988082884 -18.45299586009979,18.687577491760255 H47.89109272384644 c-10.251748718261718,0 -18.599514484405518,-8.3477657661438 -18.599514484405518,-18.599514484405518 V191.59822523358838 c0,-10.251748718261718 8.3477657661438,-18.599514484405518 18.599514484405518,-18.614697761535645 H131.89712842941285 c0.1609427375793457,0 0.3218854751586914,0 0.48358737659454354,0 c4.891292727470398,0 9.636825994491577,1.9480144557952879 12.82911001110077,5.111450245857239 l38.18062783527374,40.24555352497101 c8.96268848991394,9.25572573852539 21.499520416259767,14.557726112365721 34.38784520816803,14.557726112365721 h123.02250294685365 c10.251748718261718,0 18.599514484405518,8.3477657661438 18.599514484405518,18.599514484405518 V424.66760249188917 z"/><path d="M 79.72623 131.64013 C 82.73375 123.36945 87.7321 118.64883 96.77176 118.33273 C 105.81142 118.01664 183.46435 118.20887 190.12869 120.04583 C 196.79302 121.88278 238.50963 168.42677 251.30868 173.09609 C 264.10774 177.76541 389.39087 174.96474 395.48077 175.83164 C 401.57067 176.69854 410.44077 182.36042 411.03479 192.88673 C 411.62881 203.41304 413.25029 354.17958 412.89442 371.12236 C 412.53855 388.06514 399.04484 386.91183 399.12243 386.95197 C 399.20002 386.99211 398.52843 415.44312 399.20272 415.87927 C 399.87701 416.31542 440.00224 411.49112 440.71397 377.88927 C 441.4257 344.28742 440.59625 211.13798 439.96209 183.90432 C 439.32793 156.67066 421.64409 147.53851 403.11998 147.06221 C 384.59587 146.58591 275.94556 150.90709 263.1636 146.39581 C 250.38164 141.88453 208.99824 93.8881 195.98985 90.1287 C 182.98146 86.3693 97.12204 89.42811 86.57864000000001 88.4156 C 76.03523 87.40308 50.48841 106.46071 49.73653 131.27274"/></g></svg>
            <div class="text-1 text-bigger dialogue-text centered">${mainFolderName}</div>`, 'li', '0', 'listing-button', 'folder', 'droppable');
    elem.name = mainFolderName;
    foldersListing.push(elem);
    foldersListing.setActiveNoHandlers('0');

    const gottenFolders = await foldersGetter.getNextPage();
    gottenFolders.forEach((folder) => {
        const folderInnerHTML = folderInnerHTMLTemplate({
            title: folder.name,
            dialoguesCount: 0
        });
        const elem = newElem(folderInnerHTML, 'div', folder.id, 'listing-button', 'folder', 'droppable');
        elem.name = folder.name;
        foldersListing.push(elem);
    });
    if (isLostConnection) {
        foldersListing.plugBottomState = plugStates.offline;
    }

    // Create dialogues listing
    const foundDialogues = {
        '': newDialoguesListing()
    };
    let dialoguesListing = foundDialogues[''];
    foldersListing.findById('0').dialoguesListing = dialoguesListing;
    let currentDialoguesListing;
    /**
     * Creates new configured dialoguesListing
     *
     * @returns {Listing}
     */
    function newDialoguesListing(additionalQuery = '') {
        const dialoguesListing = new Listing(dialoguesListingElem);
        dialoguesListing.networkGetter = new PaginatedGetter(app.apiUrl + '/email/dialogues' + additionalQuery, 'since', -1, 'amount', dialoguesByRequest, 'id');
        dialoguesListing.networkGetter.onErrorHandler = (response) => {
            if (response.status !== 418) { // Empty response from SW (offline mode)
                app.messages.error(`Ошибка ${response.status}`, 'Не удалось получить список диалогов!');
            }
        };

        // create folders plugs for dialoguesListing
        foldersListing.forEach((folder) => {
            dialoguesListing.setPlugTopState('folder-' + folder.id, newElem(dividerHTMLTemplate({ folder: folder.name }), 'div', '', 'dialogues-listing-divider', 'center-text'));
        });

        dialoguesListing.setPlugBottomState(plugStates.end, newElem(`
            <svg class="svg-button" pointer-events="none" width="40" height="30" xmlns="http://www.w3.org/2000/svg"><g transform="scale(0.6)"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z"></path><path d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z"></path></g></svg>
            <div class="text-3">Больше диалогов нет</div>`,
        'div', '', 'center-text', 'empty-dialogue'));
        dialoguesListing.setPlugBottomState(plugStates.offline, newElem(`
            <svg class="svg-button centered" pointer-events="none" width="50" height="30" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1.5)"><path d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z"/><path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z"/></g></svg>
            <div class="text-1">Это все загруженные диалоги</div>`,
        'div', '', 'center-text', 'empty-dialogue'));
        dialoguesListing.setPlugBottomState(plugStates.loading, newElem('<div class="dot-pulse"></div>',
            'div', '', 'center-text', 'load-animation'));

        dialoguesListing.setOnActiveHandler(async (dialogue) => {
            // Create and configure new element
            if (!dialogue.messagesListing) {
                dialogue.messagesListing = new Listing(messagesListingElem);
                dialogue.messagesListing.networkGetter = new PaginatedGetter(app.apiUrl + '/email/emails?with=' + dialogue.username, 'since', -1, 'amount', messagesByRequest, 'id');

                dialogue.messagesListing.setPlugTopState(plugStates.end, newElem(`<svg class="svg-button centered" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><path d="M22.03 10c-8.48 0-14.97 5.92-14.97 12.8 0 2.47.82 4.79 2.25 6.74a1.5 1.5 0 01.3.9c0 1.63-.43 3.22-.96 4.67a41.9 41.9 0 01-1.17 2.8c3.31-.33 5.5-1.4 6.8-2.96a1.5 1.5 0 011.69-.43 17.06 17.06 0 006.06 1.1C30.5 35.61 37 29.68 37 22.8 37 15.93 30.5 10 22.03 10zM4.06 22.8C4.06 13.9 12.3 7 22.03 7 31.75 7 40 13.88 40 22.8c0 8.93-8.25 15.81-17.97 15.81-2.17 0-4.25-.33-6.17-.95-2.26 2.14-5.55 3.18-9.6 3.34a2.2 2.2 0 01-2.07-3.08l.42-.95c.43-.96.86-1.9 1.22-2.9.41-1.11.69-2.18.76-3.18a14.28 14.28 0 01-2.53-8.08z"></path><path d="M43.01 18.77a1.5 1.5 0 00.38 2.09c3.44 2.38 5.55 5.98 5.55 9.95 0 2.47-.81 4.78-2.25 6.73a1.5 1.5 0 00-.3.9c0 1.63.43 3.22.96 4.67.35.96.77 1.92 1.17 2.8-3.31-.33-5.5-1.4-6.8-2.96a1.5 1.5 0 00-1.69-.43 17.06 17.06 0 01-6.06 1.1c-2.98 0-5.75-.76-8.08-2.03a1.5 1.5 0 00-1.44 2.63 20.19 20.19 0 0015.7 1.44c2.25 2.14 5.54 3.18 9.59 3.34a2.2 2.2 0 002.07-3.08l-.42-.95c-.44-.96-.86-1.9-1.22-2.9a11.65 11.65 0 01-.76-3.18 14.28 14.28 0 002.53-8.08c0-5.1-2.72-9.56-6.84-12.42a1.5 1.5 0 00-2.09.38z" fill="currentColor"></path></svg>
                        <div class="text-1">Это начало истории сообщений</div>`,
                'div', '', 'center-text', 'top-filler'));
                dialogue.messagesListing.setPlugTopState(plugStates.offline, newElem(`<svg class="svg-button centered" pointer-events="none" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><g transform="scale(2.4)"><path d="M21.0303 4.83038C21.3232 4.53749 21.3232 4.06261 21.0303 3.76972C20.7374 3.47683 20.2626 3.47683 19.9697 3.76972L3.96967 19.7697C3.67678 20.0626 3.67678 20.5375 3.96967 20.8304C4.26256 21.1233 4.73744 21.1233 5.03033 20.8304L7.11065 18.7501H18.5233C20.9961 18.7501 23.0008 16.7454 23.0008 14.2725C23.0008 11.7996 20.9961 9.79493 18.5233 9.79493C18.4592 9.79493 18.3955 9.79628 18.3321 9.79895C18.2944 9.15027 18.1424 8.53227 17.8959 7.96479L21.0303 4.83038ZM16.7186 9.14209L8.61065 17.2501H18.5233C20.1677 17.2501 21.5008 15.917 21.5008 14.2725C21.5008 12.628 20.1677 11.2949 18.5233 11.2949C18.2557 11.2949 17.9975 11.33 17.7524 11.3955C17.5122 11.4596 17.2558 11.4006 17.0679 11.2378C16.8799 11.075 16.7849 10.8297 16.8141 10.5828C16.8321 10.4306 16.8414 10.2755 16.8414 10.1178C16.8414 9.78093 16.7987 9.45399 16.7186 9.14209Z"/><path d="M12.9319 4.70837C14.0388 4.70837 15.068 5.04083 15.9252 5.61134C16.0521 5.69579 16.0649 5.87451 15.9571 5.9823L15.2295 6.70991C15.1455 6.79392 15.0144 6.80644 14.912 6.74617C14.3313 6.4044 13.6545 6.20837 12.9319 6.20837C11.3816 6.20837 10.0406 7.1107 9.40813 8.42218C9.23808 8.77479 8.82543 8.9373 8.46061 8.79534C7.96987 8.60439 7.43541 8.49926 6.87461 8.49926C4.45814 8.49926 2.49921 10.4582 2.49921 12.8747C2.49921 14.521 3.40846 15.9549 4.75218 16.7017C4.90497 16.7866 4.94313 16.9963 4.81953 17.1199L4.09641 17.843C4.01666 17.9227 3.89307 17.9397 3.79705 17.8805C2.1183 16.8462 0.999207 14.9911 0.999207 12.8747C0.999207 9.62976 3.62971 6.99925 6.87461 6.99925C7.39427 6.99925 7.89899 7.0669 8.38002 7.19408C9.34177 5.69979 11.0205 4.70837 12.9319 4.70837Z"/></g></svg>
                        <div class="text-1">Это все загруженные сообщения</div>`,
                'div', '', 'center-text', 'top-filler'));
                dialogue.messagesListing.setPlugTopState(plugStates.loading, newElem('<div class="dot-pulse"></div>',
                    'div', '', 'center-text', 'load-animation'));

                dialogue.messagesListing.setScrollHandlers(async (event) => {
                    // Get messages
                    const newMessages = await dialogue.messagesListing.networkGetter.getNextPage();
                    // set messages plug
                    if (isLostConnection) {
                        dialogue.messagesListing.plugTopState = plugStates.offline;
                    } else if (newMessages.length < messagesByRequest) {
                        dialogue.messagesListing.plugTopState = plugStates.end;
                    } else {
                        dialogue.messagesListing.plugTopState = plugStates.loading;
                    }

                    // get height for scroll to previous place at end of function
                    const heightToBottom = dialogue.messagesListing.getElementsHeight() - dialogue.messagesListing.block.scrollTop;

                    convertMessagesToBlocks(newMessages);

                    newMessages.forEach((messageBlock) => {
                        const isYour = messageBlock.sender.toLowerCase() === `${app.storage.username}@liokor.ru`.toLowerCase();
                        messageBlock.time = new ParsedDate(messageBlock.time).getYesterdayFormatString();
                        const messageBlockElem = newElem(
                            messageBlockInnerHTMLTemplate({
                                side: isYour ? 'your' : 'not-your',
                                avatar: isYour ? app.storage.avatar : foldersListing.activeElem.dialoguesListing.activeElem.avatar,
                                time: messageBlock.time,
                                isStated: isYour,
                                isDelivered: (messageBlock.status === 1),
                                title: messageBlock.title,
                                body: messageBlock.body
                            }),
                            'div', messageBlock.id, 'message-block-full', isYour ? 'right-block' : 'left-block');
                        messageBlockElem.sender = messageBlock.sender;
                        messageBlockElem.title = messageBlock.title;
                        messageBlockElem.status = messageBlock.status;
                        dialogue.messagesListing.unshift(messageBlockElem);
                    });

                    dialogue.messagesListing.redraw();

                    // Scroll to previous place
                    dialogue.messagesListing.block.scrollTop = dialogue.messagesListing.getElementsHeight() - heightToBottom;
                }, null, messagesScrollLoadOffset, 0);
            }

            // get first part of messages
            if (dialogue.messagesListing.isEmpty()) {
                do {
                    const newMessages = await dialogue.messagesListing.networkGetter.getNextPage();

                    convertMessagesToBlocks(newMessages);

                    newMessages.forEach((messageBlock) => {
                        const isYour = messageBlock.sender.toLowerCase() === `${app.storage.username}@liokor.ru`.toLowerCase();
                        messageBlock.time = new ParsedDate(messageBlock.time).getYesterdayFormatString();
                        const messageBlockElem = newElem(
                            messageBlockInnerHTMLTemplate({
                                side: isYour ? 'your' : 'not-your',
                                avatar: isYour ? app.storage.avatar : foldersListing.activeElem.dialoguesListing.activeElem.avatar,
                                time: messageBlock.time,
                                isStated: isYour,
                                isDelivered: (messageBlock.status === 1),
                                title: messageBlock.title,
                                body: messageBlock.body
                            }),
                            'div', messageBlock.id, 'message-block-full', isYour ? 'right-block' : 'left-block');
                        messageBlockElem.sender = messageBlock.sender;
                        messageBlockElem.title = messageBlock.title;
                        messageBlockElem.status = messageBlock.status;
                        dialogue.messagesListing.unshift(messageBlockElem);
                    });

                    dialogue.messagesListing.plugTopState = plugStates.loading;
                    if (isLostConnection) {
                        dialogue.messagesListing.plugTopState = plugStates.offline;
                    } else if (newMessages.length < messagesByRequest) {
                        dialogue.messagesListing.plugTopState = plugStates.end;
                    }

                    dialogue.messagesListing.redraw(); // to get elements height. Before drawing it equals 0
                } while (dialogue.messagesListing.getElementsHeight() < dialogue.messagesListing.block.clientHeight && dialogue.messagesListing.plugTopState === plugStates.loading);
            }

            // Deactivate scroll on previous element and activate current
            if (currentDialoguesListing && currentDialoguesListing.prevActiveElem) {
                currentDialoguesListing.prevActiveElem.messagesListing.scrollActive = false;
                if (currentDialoguesListing !== dialoguesListing) {
                    currentDialoguesListing.unsetActive();
                }
            }
            dialogue.messagesListing.scrollActive = true;

            // clear unread messages status
            dialogue.classList.add('status-read');

            // For mobile version. Go to messages column, hide dialogues
            dialoguesColumn.classList.remove('mobile-fullwidth');
            messagesColumn.classList.add('mobile-fullwidth');

            // show messages footer
            messagesFooter.style.display = 'flex'; // show message input

            // update messages header
            dialogueHeader.innerText = dialogue.username;
            dialogueTime.innerText = dialogue.time;

            // push old message-input and theme into localStorage
            if (currentDialoguesListing && currentDialoguesListing.prevActiveElem) {
                localStorage.setItem(currentDialoguesListing.prevActiveElem.username + '-theme', themeInput.value);
                localStorage.setItem(currentDialoguesListing.prevActiveElem.username + '-message', messageInput.value);
            }
            // get new message-input and theme from localStorage
            const theme = localStorage.getItem(dialogue.username + '-theme');
            const message = localStorage.getItem(dialogue.username + '-message');
            themeInput.value = theme;
            messageInput.value = message;

            // set default theme of message
            const messageBlock = dialogue.messagesListing.getLast();
            if (messageBlock) {
                if (messageBlock.sender !== app.storage.username + '@liokor.ru') {
                    if (messageBlock.title.substr(0, 3).toLowerCase() === 're[') {
                        const { 0:num, 1:theme } = messageBlock.title.substr(3).split(']');
                        themeInput.value = 'Re[' + (Number(num) + 1) + ']' + theme;
                    } else if (messageBlock.title.substr(0, 3).toLowerCase() === 're:') {
                        themeInput.value = messageBlock.title;
                    } else {
                        themeInput.value = 'Re: ' + messageBlock.title;
                    }
                } else {
                    themeInput.value = messageBlock.title;
                }
            }

            // set dialogue url
            const currentPath = new URL(window.location.href);
            currentPath.searchParams.set('dialogue', dialogue.username);
            history.pushState(null, null, currentPath.toString());
            document.title = `${app.name} | ${dialogue.username}`;

            messageInput.focus();

            dialogue.messagesListing.redraw();
            dialogue.messagesListing.scrollToBottom();

            currentDialoguesListing = dialoguesListing;
            currentDialoguesListing.prevActiveElem = dialogue;
        });

        // create dialogues scroll event-listener to upload new dialogues
        /* dialoguesListing.setScrollHandlers(null, async (event) => {
            const newDialogues = await dialoguesListing.networkGetter.getNextPage();

            newDialogues.forEach((dialogue) => {
                dialogue.time = new ParsedDate(dialogue.time).getYesterdayFormatString();
                convertAvatarUrlToDefault(dialogue, app.defaultAvatarUrl);
                const elem = newElem(dialogueInnerHTMLTemplate({ avatar: dialogue.avatarUrl, time: dialogue.time, title: dialogue.username, body: dialogue.body, newMessages: dialogue.new}),
                    'li', dialogue.id, 'listing-button', 'droppable');
                elem.username = dialogue.username;
                elem.avatar = dialogue.avatarUrl;
                dialoguesListing.push(elem);
                setDialogueDraggable(elem);
            });

            dialoguesListing.plugBottomState = plugStates.loading;
            if (isLostConnection) {
                dialoguesListing.plugBottomState = plugStates.offline;
            } else if (newDialogues.length < dialoguesByRequest) {
                dialoguesListing.plugBottomState = plugStates.end;
            }
            dialoguesListing.redraw();
        }, 0, dialoguesScrollLoadOffset); */

        // create Event-listener on dialogue element to activate it
        dialoguesListing.setClickElementHandler(async (event) => {
            foldersListing.clearSelected();
            dialoguesListing.clearSelected();
            await dialoguesListing.setActive(event.currentTarget.id);
        });
        // create Event-listener on dialogue element to reset selected
        dialoguesListing.setMousemoveElementHandler(async (event) => {
            foldersListing.clearSelected();
            dialoguesListing.clearSelected();
            await dialoguesListing.addSelected(event.currentTarget.id);
        });

        return dialoguesListing;
    }

    foldersListing.setOnActiveHandler(async (folder) => {
        // create new dialoguesListing for folder
        if (!folder.dialoguesListing || folder.plugBottomState === plugStates.offline) {
            dialoguesListing.scrollActive = false;
            dialoguesListing = newDialoguesListing('?folder=' + folder.id);
            folder.dialoguesListing = dialoguesListing;

            // get folder dialogues
            do {
                const gottenDialogues = await dialoguesListing.networkGetter.getNextPage(['folder', folder.id]);
                gottenDialogues.forEach((dialogue) => {
                    dialogue.time = new ParsedDate(dialogue.time).getYesterdayFormatString();
                    convertAvatarUrlToDefault(dialogue, app.defaultAvatarUrl);
                    const elem = newElem(dialogueInnerHTMLTemplate({ avatar: dialogue.avatarUrl, time: dialogue.time, title: dialogue.username, body: dialogue.body, newMessages: dialogue.new}),
                        'li', dialogue.id, 'listing-button', 'droppable');
                    elem.username = dialogue.username;
                    elem.avatar = dialogue.avatarUrl;
                    dialoguesListing.push(elem);
                    setDialogueDraggable(elem);
                });

                dialoguesListing.plugBottomState = plugStates.loading;
                if (isLostConnection) {
                    dialoguesListing.plugBottomState = plugStates.offline;
                } else if (gottenDialogues.length < dialoguesByRequest) {
                    dialoguesListing.plugBottomState = plugStates.end;
                }
                dialoguesListing.redraw(); // to get elements height. Before drawing it equals 0
            } while (dialoguesListing.getElementsHeight() < dialoguesListing.block.clientHeight && dialoguesListing.plugBottomState === plugStates.loading);
        }
        dialoguesListing.scrollActive = false;
        dialoguesListing = folder.dialoguesListing;
        dialoguesListing.scrollActive = true;
        dialoguesListing.plugTopState = 'folder-' + folder.id;
        foldersListing.undraw();
        if (foldersListing.isOpened) {
            foldersListing.draw();
        }
        dialoguesListing.draw();

        foldersListing.scrollToTop();

        // set folder url
        const currentPath = new URL(window.location.href);
        if (folder.id === '0') {
            currentPath.searchParams.delete('folder');
        } else {
            currentPath.searchParams.delete('dialogue');
            currentPath.searchParams.set('folder', folder.id);
        }
        history.pushState(null, null, currentPath.toString());
    });

    // --- Lost connection events
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
        dialoguesListing.scroll();
        if (dialoguesListing.activeElem) {
            dialoguesListing.activeElem.messagesListing.scroll();
        }
        for (let i = 0; i < connectionsInfo.length; i++) {
            connectionsInfo[i].style.top = '-40px';
            connectionsInfo[i].style.opacity = '0';
            setTimeout(() => { connectionsInfo[i].style.visibility = 'hidden'; }, 500);
        }
        isLostConnection = false;
    });

    // --- Get dialogues
    do {
        const gottenDialogues = await dialoguesListing.networkGetter.getNextPage();
        gottenDialogues.forEach((dialogue) => {
            dialogue.time = new ParsedDate(dialogue.time).getYesterdayFormatString();
            convertAvatarUrlToDefault(dialogue, app.defaultAvatarUrl);
            const elem = newElem(dialogueInnerHTMLTemplate({ avatar: dialogue.avatarUrl, time: dialogue.time, title: dialogue.username, body: dialogue.body, newMessages: dialogue.new }),
                'li', dialogue.id, 'listing-button', 'droppable');
            elem.username = dialogue.username;
            elem.avatar = dialogue.avatarUrl;
            dialoguesListing.push(elem);
            setDialogueDraggable(elem);
        });

        dialoguesListing.plugBottomState = plugStates.loading;
        if (isLostConnection) {
            dialoguesListing.plugBottomState = plugStates.offline;
        } else if (gottenDialogues.length < dialoguesByRequest) {
            dialoguesListing.plugBottomState = plugStates.end;
        }
        dialoguesListing.redraw(); // to get elements height. Before drawing it equals 0
    } while (dialoguesListing.getElementsHeight() < dialoguesListing.block.clientHeight && dialoguesListing.plugBottomState === plugStates.loading);

    // --- Get query-parameters
    const searchParams = new URL(window.location.href).searchParams;
    const gottenDialogue = searchParams.get('dialogue');
    const gottenFolder = searchParams.get('folder');
    if (gottenFolder) {
        if (foldersListing.findById(gottenFolder)) {
            await foldersListing.setActive(gottenFolder);
        } else {
            app.messages.error(`Папка не найдена`, 'ID: ' + gottenFolder);
        }
    }
    if (gottenDialogue) {
        const foundDialogue = dialoguesListing.findBy('username', gottenDialogue);
        if (foundDialogue) {
            await dialoguesListing.setActive(foundDialogue.id);
        } else {
            app.messages.error(`Диалог не найден`, gottenDialogue);
        }
    }

    // --- Create send message event-listener
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
        localStorage.setItem(dialoguesListing.activeElem.username + '-theme', themeInput.value);
        localStorage.setItem(dialoguesListing.activeElem.username + '-message', messageInput.value);
        // resize input element
        messageInput.style.height = messageInput.style.minHeight;
        messageInput.style.height = messageInput.scrollHeight + 2 + 'px'; // 2 = border-width * 2
    });

    // --- Open folders button
    foldersListing.isOpened = false;
    foldersButton.addEventListener('click', (event) => {
        // close folders
        if (foldersListing.isOpened === true) {
            foldersIconArrow.style.transform = 'scale(0.03) rotate(0deg) translate(500px, 430px)';
            foldersListing.isOpened = false;

            if (foldersListing.activeElem.id === '0') {
                dialoguesListing.plugTopState = plugStates.none;
            }
            foldersListing.clearSelected();
            dialoguesListing.redraw();
            return;
        }
        // open folders
        foldersIconArrow.style.transform = 'scale(0.03) rotate(180deg) translate(-950px, -880px)';
        foldersListing.isOpened = true;
        dialoguesListing.plugTopState = 'folder-' + foldersListing.activeElem.id;
        foldersListing.redraw();
        dialoguesListing.draw();
        foldersListing.scrollToTop();
    });

    // --- Find dialogues
    // create clear-find event-listener
    document.getElementById('clear-find-button').addEventListener('click', (event) => {
        findInput.value = '';
        findInput.dispatchEvent(new Event('input'));
    });

    // create find input event-listener
    findInput.addEventListener('input', async (event) => {
        // get find value
        const findText = findInput.value;
        dialoguesListing.scrollActive = false;
        if (findText === '') {
            dialoguesListing = foldersListing.activeElem.dialoguesListing;
        } else {
            dialoguesListing = foundDialogues[findText];
        }
        if (!dialoguesListing) {
            dialoguesListing = newDialoguesListing();
            // get found dialogues
            const gottenDialogues = await dialoguesListing.networkGetter.get(['find', findText]);
            gottenDialogues.forEach((dialogue) => {
                dialogue.time = new ParsedDate(dialogue.time).getYesterdayFormatString();
                convertAvatarUrlToDefault(dialogue, app.defaultAvatarUrl);

                const dialogueInnerHTML = dialogueInnerHTMLTemplate({
                    avatar: dialogue.avatarUrl,
                    time: dialogue.time,
                    title: dialogue.username,
                    body: dialogue.body,
                    newMessages: dialogue.new
                });
                const elem = newElem(dialogueInnerHTML, 'li', dialogue.id, 'listing-button', 'droppable');
                elem.username = dialogue.username;
                elem.avatar = dialogue.avatarUrl;
                dialoguesListing.push(elem);
                setDialogueDraggable(elem);
            });

            foundDialogues[findText] = dialoguesListing;
        }
        dialoguesListing.scrollActive = true;

        // set offline plug
        if (findText !== '') {
            dialoguesListing.plugBottomState = plugStates.none;
            if (isLostConnection) {
                dialoguesListing.plugBottomState = plugStates.offline;
            }
        }

        // close folders listing
        if (foldersListing.isOpened) {
            foldersButton.dispatchEvent(new Event('click'));
        }

        // redraw dialogues
        dialoguesListing.redraw();
        dialoguesListing.scrollToTop();

        // redraw add-dialogue button
        if (validateEmail(findText)) { // address valid
            if (!dialoguesListing.findBy('username', findText)) { // dialogue with accuracy coincidence not found
                addCreateNewDialogueElem(); // draw a button that creates a new dialogue
                findButton.innerHTML = '<path transform="scale(2.2) translate(-1,-1)" d="M10 3.25c.41 0 .75.34.75.75v5.25H16a.75.75 0 010 1.5h-5.25V16a.75.75 0 01-1.5 0v-5.25H4a.75.75 0 010-1.5h5.25V4c0-.41.34-.75.75-.75z"/>';
            } else { // dialogue found => draw arrow on button
                findButton.innerHTML = '<path transform="scale(1.5) translate(2, 0)" d="m12.1 7.87v-3.47a1.32 1.32 0 0 1 2.17-1l8.94 7.6a1.32 1.32 0 0 1 .15 1.86l-.15.15-8.94 7.6a1.32 1.32 0 0 1 -2.17-1v-3.45c-4.68.11-8 1.09-9.89 2.87a1.15 1.15 0 0 1 -1.9-1.11c1.53-6.36 5.51-9.76 11.79-10.05zm1.8-2.42v4.2h-.9c-5.3 0-8.72 2.25-10.39 6.86 2.45-1.45 5.92-2.16 10.39-2.16h.9v4.2l7.71-6.55z"/>';
            }
            return;
        }
        // address invalid
        // findText is empty => draw default "2 dialogues" on button
        if (findText === '') {
            findButton.innerHTML = '<g transform="scale(2) translate(0, -2)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g>';
            return;
        }
        // findText isn't empty => draw magnifier on button
        findButton.innerHTML = '<g transform="scale(0.06) translate(40,60)"><path d="M506.141,477.851L361.689,333.399c65.814-80.075,61.336-198.944-13.451-273.73c-79.559-79.559-209.01-79.559-288.569,0    s-79.559,209.01,0,288.569c74.766,74.766,193.62,79.293,273.73,13.451l144.452,144.452c7.812,7.812,20.477,7.812,28.289,0    C513.953,498.328,513.953,485.663,506.141,477.851z M319.949,319.948c-63.96,63.96-168.03,63.959-231.99,0    c-63.96-63.96-63.96-168.03,0-231.99c63.958-63.957,168.028-63.962,231.99,0C383.909,151.918,383.909,255.988,319.949,319.948z"/></g>';
    });

    // create event-listener on press key in input
    findInput.addEventListener('keydown', async (event) => {
        if (controlKeys.includes(event.keyCode)) {
            event.stopPropagation();
        }
        if (event.keyCode === 27) { // Esc
            findInput.blur();
        } else if (event.keyCode === 13) { // Enter
            const findText = findInput.value;

            // Set active dialogue
            const foundDialogue = dialoguesListing.findBy('username', findText);
            if (foundDialogue) {
                findInput.value = '';
                findInput.dispatchEvent(new Event('input'));
                messageInput.focus();
                await dialoguesListing.setActive(foundDialogue.id);
                return;
            }

            if (!validateEmail(findText)) {
                return;
            }

            await foldersListing.setActive('0'); // switch to main folder
            findInput.value = '';
            findInput.dispatchEvent(new Event('input'));
            themeInput.focus();
            // Create new dialogue
            createdDialogues += 1;
            const tmpAvatarContainer = {username: findText};
            convertAvatarUrlToDefault(tmpAvatarContainer, app.defaultAvatarUrl);
            const elem = newElem(dialogueInnerHTMLTemplate({ avatar: tmpAvatarContainer.avatarUrl, time: new ParsedDate().getYesterdayFormatString(), title: findText, body: '', newMessages: 0 }),
                'li', '-' + createdDialogues, 'listing-button', 'droppable');
            elem.username = findText;
            elem.avatar = tmpAvatarContainer.avatarUrl;
            setDialogueDraggable(elem);

            dialoguesListing.unshift(elem);
            await dialoguesListing.setActive(-createdDialogues);
            foldersListing.undraw();
            if (foldersListing.isOpened) {
                foldersListing.draw()
            }
            dialoguesListing.draw();
            dialoguesListing.scrollToTop();
        }
    });

    // create find-dialogue click event-listener
    findButton.addEventListener('click', (event) => {
        if (findInput.value === '') {
            findInput.focus();
            return;
        }
        const newEvent = new Event('keydown');
        newEvent.keyCode = 13; // key enter
        findInput.dispatchEvent(newEvent); // trigger press enter event-listener
    });

    backToDialoguesButton.addEventListener('click', (event) => {
        // For mobile version. Go to dialogues
        dialoguesColumn.classList.add('mobile-fullwidth');
        messagesColumn.classList.remove('mobile-fullwidth');

        // delete dialogue from url
        const currentPath = new URL(window.location.href);
        currentPath.searchParams.delete('dialogue');
        history.pushState(null, null, currentPath.toString());
        document.title = `${app.name} | Диалоги`;
    });

    // Imitate loading work... Simple clicker-game for our user
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
    /*
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
            if (typeof selectedElem.type === 'undefined') {
                return;
            }
            if (selectedElem.type === elemTypes.dialogue) {
                setActiveDialogue(selectedElem.elem);
            } else {
                setActiveFolder(selectedElem.elem);
            }
            break;
        case 37: // left arrow
        case 27: // escape
            unsetActiveDialogue();
            break;
        }
    });
     */

    /**
     * Converts messages to blocks
     *
     * @param messages to convert to blocks
     */
    function convertMessagesToBlocks(messages) {
        messages.forEach((elem) => {
            elem.time = new Date(elem.time);
            elem.body = [new Handlebars.SafeString(elem.body)];
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
     * Add create new dialogue element on top of dialogues listing
     */
    function addCreateNewDialogueElem() {
        // create dialogue HTML-element
        const elem = newElem('<svg class="plus-button" id="find-dialogue-button" xmlns="http://www.w3.org/2000/svg"><g transform="scale(3) translate(1, -2)"><path d="M10.25 2.5C5.68 2.5 2 5.83 2 10a7 7 0 001.26 4c-.1.6-.47 1.52-1.12 2.73a1.2 1.2 0 001.1 1.77c1.9-.06 3.35-.51 4.35-1.4.85.27 1.74.4 2.66.4 4.57 0 8.25-3.33 8.25-7.5s-3.68-7.5-8.25-7.5zm0 1.5C6.37 4 3.5 6.79 3.5 10a5.51 5.51 0 001 3.15l.17.26a.75.75 0 01.12.55l-.05.3c-.13.74-.5 1.67-1.03 2.71a4.84 4.84 0 002.89-.99l.31-.28a.75.75 0 01.72-.15l.4.12a7.58 7.58 0 002.22.33c3.88 0 6.75-2.79 6.75-6s-2.87-6-6.75-6z"/><path d="M11 7a.75.75 0 00-1.5 0v2.25H7.25a.75.75 0 000 1.5H9.5V13a.75.75 0 001.5 0v-2.25h2.25a.75.75 0 000-1.5H11V7z"/></g></svg>',
            'li', 'new-dialogue-button', 'listing-button', 'center-text', 'p-xs');
        dialoguesListingElem.insertBefore(elem, dialoguesListingElem.firstChild);

        // create Event-listener on element
        elem.addEventListener('click', async (event) => {
            const newEvent = new Event('keydown');
            newEvent.keyCode = 13;
            findInput.dispatchEvent(newEvent); // trigger enter event-listener
        });
    }

    /**
     * Sends email
     */
    async function sendMessage() {
        if (!navigator.onLine) {
            app.messages.error('Нет соединения', 'Без интернета отправить письмо не получится');
            return;
        }
        // check inputs
        let currentTitle = themeInput.value;
        if (currentTitle === '') { currentTitle = 'Без темы'; }
        let message = messageInput.value;
        if (message === '') {
            return;
        }

        // send message request
        const response = await app.apiPost('/email', {
            recipient: dialoguesListing.activeElem.username,
            subject: currentTitle,
            body: message
        });
        const responseData = await response.json();
        if (!response.ok) {
            app.messages.error(`Ошибка ${response.status}`, `Не удалось отправить письмо: ${responseData.message}`);
        }

        currentTitle = response.ok ? responseData.subject : currentTitle;
        message = response.ok ? new Handlebars.SafeString(responseData.body) : message;

        // clear input
        messageInput.value = '';

        // update dialogue preview
        dialoguesListing.activeElem.lastElementChild.lastElementChild.innerText = message;

        // add message HTML-block
        const nowStatus = response.ok ? 1 : 0;
        const lastMessage = dialoguesListing.activeElem.messagesListing.getLast();
        if (lastMessage && nowStatus === lastMessage.status && lastMessage.sender.toLowerCase() === `${app.storage.username}@liokor.ru`.toLowerCase() && lastMessage.title === currentTitle) {
            lastMessage.firstElementChild.innerHTML += `<div id="${lastMessage.id}" class="message-body">${message}</div>`;
        } else {
            // add block to messages list
            const elem = newElem(messageBlockInnerHTMLTemplate({
                side: 'your',
                avatar: app.storage.avatar,
                time: new ParsedDate().getYesterdayFormatString(),
                isStated: true,
                isDelivered: response.ok,
                title: currentTitle,
                body: [message]
            }),
            'div', lastMessage ? lastMessage.id + 1 : 0, 'message-block-full', 'right-block');
            elem.title = currentTitle;
            elem.sender = `${app.storage.username}@liokor.ru`;
            elem.status = nowStatus;
            dialoguesListing.activeElem.messagesListing.push(elem);
        }
        dialoguesListing.activeElem.messagesListing.redraw();
        dialoguesListing.activeElem.messagesListing.scrollToBottom();
    }

    /**
     * Creates new HTML element
     *
     * @param innerHTML
     * @param tag
     * @param id
     * @param classes
     * @returns {*}
     */
    function newElem(innerHTML, tag, id, ...classes) {
        const elem = document.createElement(tag);
        elem.id = id;
        elem.classList.add(...classes);
        elem.innerHTML = innerHTML;
        return elem;
    }

    /**
     * @param dialogue
     * @param folder
     */
    async function addDialogueToFolder(dialogue, folder) {
        const response = await app.apiPut('/email/folder', {
            dialogueId: Number(dialogue),
            folderId: Number(folder)
        });
        const responseData = await response.json();
        if (!response.ok) {
            app.messages.error(`Ошибка ${response.status}`, `Не удалось добавить в папку: ${responseData.message}`);
            return;
        }
        app.messages.success(`Диалог перемещён`, `Диалог c ${dialoguesListing.findById(dialogue).username} в папку ${foldersListing.findById(folder).name}`);
    }

    /**
     * @param title
     * @return id
     */
    async function createNewFolder(title) {
        const response = await app.apiPost('/email/folder', {
            name: title
        });
        const responseData = await response.json();
        if (!response.ok) {
            app.messages.error(`Ошибка ${response.status}`, `Не удалось создать папку: ${responseData.message}`);
            return;
        }
        app.messages.success('Папка создана', `С именем: ${title}`);
        return responseData.id;
    }

    /**
     * @param elem
     */
    function setDialogueDraggable(elem) {
        // Create and configure dragAndDropper on dialoguesListing elements
        setDraggable(elem,
            (elem) => { elem.style.background = 'pink'; },
            (elem) => { elem.style.background = ''; },
            async (elem, underElem, isInside) => {
                // drop dialogue on folder => add dialogue to folder
                if (!underElem) {
                    elem.remove();
                    foldersListing.undraw();
                    if (foldersListing.isOpened) {
                        foldersListing.draw();
                    }
                    dialoguesListing.draw();
                    return;
                }
                if (underElem.classList.contains('folder')) {
                    const folderDialogues = foldersListing.findById(underElem.id).dialoguesListing;
                    if (!isInside || folderDialogues === dialoguesListing) {
                        elem.remove();
                        foldersListing.undraw();
                        if (foldersListing.isOpened) {
                            foldersListing.draw();
                        }
                        dialoguesListing.draw();
                        return;
                    }
                    await addDialogueToFolder(elem.id, underElem.id);

                    dialoguesListing.delete(elem.id);

                    if (folderDialogues) {
                        folderDialogues.unshift(elem);
                    }
                    return;
                }
                // drop dialogue on dialogue => create folder
                let folderName;
                if (isInside) {
                    // Ask user for name of folder
                    folderName = window.prompt(`Вы собираетесь создать новую папку из двух диалогов.
Как она будет называться?`);
                }
                if (!folderName) {
                    elem.remove();
                    foldersListing.undraw();
                    if (foldersListing.isOpened) {
                        foldersListing.draw();
                    }
                    dialoguesListing.draw();
                    return;
                }

                // create folder
                const folderId = await createNewFolder(folderName);
                const folderElem = newElem(folderInnerHTMLTemplate({ title: folderName, dialoguesCount: 2 }),
                    'div', folderId, 'listing-button', 'folder', 'droppable');
                folderElem.name = elem.username;
                foldersListing.push(folderElem);

                // put dialogues into folder
                await addDialogueToFolder(elem.id, folderId);
                await addDialogueToFolder(underElem.id, folderId);

                // delete dialogues from current page
                dialoguesListing.delete(elem.id);
                dialoguesListing.delete(underElem.id);

                // open dialogues listing
                if (foldersListing.isOpened) {
                    foldersListing.redraw();
                    dialoguesListing.draw();
                    return;
                }
                foldersButton.dispatchEvent(new Event('click'));
            }
        );
    }
}
