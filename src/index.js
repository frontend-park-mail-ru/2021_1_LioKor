import './styles/global.styl';
import './styles/page.styl';
import './styles/formControls.styl';
import './styles/profile.styl';
import './styles/messages.styl';

import { registerSW } from './modules/sw-installer.js';
import App from './app';

// const API_BASE_URL = 'https://api.mail.liokor.ru';
const API_BASE_URL = 'https://mail.liokor.ru/api';

const headContentHTML = '<link rel="icon" href="/images/favicon.ico" type="image/x-icon">';
const baseContentHTML = `<div class="main" id="main">
    <header class="lite desktop-only">
        <div class="logo">
            <div class="image">
                <img src="/images/liokor_logo.png" alt="logo">
            </div>
            <div class="text">
                <span>MAIL</span>
            </div>
        </div>
    </header>

    <div id="app" class="title"></div>
</div>`;

/**
 * Main function (entry point) of a frontend
 *
 */
async function main() {
    document.head.innerHTML += headContentHTML;
    document.body.innerHTML = baseContentHTML + document.body.innerHTML;

    await registerSW();

    const { hostname, origin, pathname, search } = window.location;
    let apiUrl = API_BASE_URL;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
        apiUrl = `${origin}/api`;
    }
    const app = new App('LioKor', apiUrl, 'app');

    const response = await app.apiGet('/user');
    if (response.ok) {
        const { username, avatarUrl } = await response.json();
        app.updateStorage(username, avatarUrl);
    }

    await app.goto(pathname + search);
}

main();
