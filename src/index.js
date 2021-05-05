import './styles/page.styl';
import './styles/formControls.styl';
import './styles/profile.styl';
import './styles/messages.styl';

import { registerSW } from './modules/sw-installer.js';
import App from './app';

/**
 * Main function (entry point) of a frontend
 *
 */
async function main() {
    await registerSW();

    const { hostname, origin, pathname, search } = window.location;
    let apiUrl = 'https://api.mail.liokor.ru';
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
        apiUrl = `${origin}/api`;
    }
    const app = new App('LioKor', apiUrl, 'app', 'popupMessages');

    const response = await app.apiGet('/user');
    if (response.ok) {
        const { username, avatarUrl } = await response.json();
        app.updateStorage(username, avatarUrl);
    }

    await app.goto(pathname + search);
}

main();
