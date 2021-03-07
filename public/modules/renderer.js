import * as auth from "../pages/auth.js";
import * as profile from "../pages/profile.html.js";
import * as signup from "../pages/signup.html.js";
import * as change_password from "../pages/change_password.html.js";

export function render(target, path, router, callback) {
    const body = document.getElementById(target);
    try {
        console.log("Render " + path.substring(1) + ".html");
        body.style.opacity = "0%";
        //document.querySelector("body").style.backgroundPosition = `${Math.floor(35 + Math.random()*20)}%`; // random from 35% to 55%
        setTimeout(() => {
            try {
                eval(path.substring(1)).source(body, router);
            } catch {
                router.goto("/auth");
            }
            body.style.opacity = "100%";
            callback();
        }, 200);
    } catch {
        console.log("Bad try to render " + path.substring(1) + ".html");
        body.innerHTML = "Error in \"" + path.substring(1) + ".html" + "\"";
    };
}