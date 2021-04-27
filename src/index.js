import './styles/page.styl';
import './styles/formControls.styl';
import './styles/popupMessages.styl';
import './styles/profile.styl';
import './styles/messages.styl';

import { registerSW } from './modules/sw-installer.js';
import App from './modules/app.js';

/**
 * Main function (entry point) of a frontend
 *
 */
async function main() {
    await registerSW();

    const { hostname, host, pathname, search } = window.location;
    let apiUrl = 'https://api.mail.liokor.ru';
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
        apiUrl = `http://${host}/api`;
    }
    const app = new App('LioKor', apiUrl, 'app', 'popupMessages');

    const response = await app.apiGet('/user');
    if (response.ok) {
        // authenticated => redirecting to profile
        const { username, avatarUrl } = await response.json();
        app.updateStorage(username, avatarUrl);

        if (pathname === '/') {
            await app.goto('/messages' + search);
            return;
        }
        await app.goto(pathname + search);
        return;
    }

    if (pathname === '/') {
        await app.goto('/auth');
        return;
    }
    await app.goto(pathname + search);
}

main();
