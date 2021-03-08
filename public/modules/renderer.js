import * as auth from '../pages/auth.html.js';
import * as user from '../pages/profile_page.html.js';
import * as signup from '../pages/signup.html.js';
import * as changePassword from '../pages/change_password.html.js';
// import * as userView from '../pages/user_view.html.js'

export function render(target, path, router, callback) {
    const body = document.getElementById(target);
    try {
        body.style.opacity = '0%';

        setTimeout(() => {
            if (path === '/auth') {
                auth.source(body, router);
            } else if (path === '/signup') {
                signup.source(body, router);
            } else if (path === '/user') {
                user.source(body, router);
            } else if (path.endsWith('password')) {
                changePassword.source(body, router);
            } else {
                // path not found => redirecting to the default page
                router.goto('/auth');
            }

            body.style.opacity = '100%';
            callback();
        }, 200);
    } catch {
        body.innerHTML = 'Error occured while trying to render ' + path;
    };
}
