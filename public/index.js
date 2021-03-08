import Router from "./modules/router.js";
import {ajax} from "./modules/ajax.js";

const router = new Router();

ajax("GET", "/api/user", null, (status, response) => {
    /*if (status == 200) { // valid
        document.getElementById("nickname").innerText = response.nickname;
        document.getElementById("me/login-button").setAttribute('href', '/me');
        document.getElementById("progressbar").style.backgroundPositionX = `${100 - 100 / response.len * response.progress}%`;
        document.getElementById("progress").innerText = response.progress;
    } else { // invalid
        document.getElementById("progressbar").style.backgroundPositionX = "100%";
        document.getElementById("me/login-button").setAttribute('href', '/login');
    }*/
    console.log(location.pathname);
    if (location.pathname === "/")
        router.goto("/auth");
    else
        router.goto(location.pathname);
});