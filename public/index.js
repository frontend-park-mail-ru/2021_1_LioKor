import App from './modules/app.js';

function main() {
    let apiUrl = 'https://mail.liokor.ru/api';
    if (window.location.hostname === 'localhost') {
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
