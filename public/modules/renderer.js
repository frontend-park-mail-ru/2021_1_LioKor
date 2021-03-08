import * as auth from "../pages/auth.html.js";
import * as user from "../pages/profile_page.html.js";
import * as signup from "../pages/signup.html.js";
import * as change_password from "../pages/change_password.html.js";
import * as user_view from "../pages/user_view.html.js";

export function render(target, path, router, callback) {
    const body = document.getElementById(target);
    try {
        console.log("Render /" + path.substring(1));
        body.style.opacity = "0%";
        //document.querySelector("body").style.backgroundPosition = `${Math.floor(35 + Math.random()*20)}%`; // random from 35% to 55%
        setTimeout(() => {
            try {
                eval(path.substring(1)).source(body, router); // if page exists
            } catch {
                router.goto("/auth"); // if not exists - redirect to default page
            }
            body.style.opacity = "100%";
            callback();
        }, 200);
    } catch {
        console.log("Bad try to render " + path.substring(1) + ".html");
        body.innerHTML = "Error in \"" + path.substring(1) + ".html" + "\"";
    };
}