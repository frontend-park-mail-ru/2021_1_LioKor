import App from './modules/app.js';

function main() {
    let apiUrl = 'https://api.mail.liokor.ru';
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        apiUrl = `http://${window.location.host}/api`;
    }
    const app = new App('LioKor', apiUrl);

    if (location.pathname === '/') {
        app.goto('/auth');
        return;
    }
    app.goto(location.pathname);
}
main();
