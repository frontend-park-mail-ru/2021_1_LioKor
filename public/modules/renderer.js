import * as auth from '../pages/auth.html.js';
import * as user from '../pages/profile_page.html.js';
import * as signup from '../pages/signup.html.js';
import * as changePassword from '../pages/change_password.html.js';
// import * as userView from '../pages/user_view.html.js'

export function render (target, path, router, callback) {
    const body = document.getElementById(target);
    try {
        console.log(path);
        console.log('Rendering /' + path.substring(1));
        body.style.opacity = '0%';

        setTimeout(() => {
            try {
                if (path === '/auth') {
                    auth.source(body, router);
                } else if (path === '/signup') {
                    signup.source(body, router);
                } else if (path === '/user') {
                    user.source(body, router);
                } else if (path.endsWith('password')) {
                    changePassword.source(body, router);
                }
            } catch {
                router.goto('/auth'); // if not exists - redirect to default page
            }
            body.style.opacity = '100%';
            callback();
        }, 200);
    } catch {
        body.innerHTML = 'Error occured while trying to render ' + path;
    };
}
