import Router from './modules/router.js';
import { ajax } from './modules/ajax.js';

const router = new Router();

ajax('GET', '/api/user', null, (status, response) => {
    if (location.pathname === '/') {
        router.goto('/auth');
    } else {
        router.goto(location.pathname);
    }
});
