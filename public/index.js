import Router from './modules/router.js';

function main() {
    const router = new Router();

    if (location.pathname === '/') {
        router.goto('/auth');
        return;
    }

    router.goto(location.pathname);
}
main();
