import {ajax} from "../modules/ajax.js";
import { readImageAsDataURL } from '../modules/images.js';

const html = `
<div class="main profile">
    <header class="lite">
        <div class="logo">
            <div class="image">
                <img src="../images/liokor_logo.png">
            </div>
            <div class="text">
                <span>MAIL</span>
            </div>
        </div>
    </header>

    <div class="content">
        <div class="standalone-form profile">
            <div class="title">
                <div class="avatar">
                    <img id="avatarImage" src="../images/avatar.jpg">
                    <div id="avatarChange" class="cover">
                        Изменить
                    </div>
                </div>
                <div class="primary" id="username"></div>
                <div class="secondary" id="email"></div>
            </div>
            <div class="form">
                <form id="editProfileForm">
                    <input name="avatarDataURL" type="hidden" id="avatarDataURL">

                    <div class="form-group" id="fullnameGroup">
                        <label>ПОЛНОЕ ИМЯ<span class="error-text" id="fullnameErrorText"></span></label>
                        <input name="fullname" type="text" class="form-control" id="fullnameInput">
                    </div>
                    <div class="form-group" id="reserveEmailGroup">
                        <label>ЗАПАСНОЙ reserveEmail<span class="error-text" id="reserveEmailErrorText"></span></label>
                        <input name="reserveEmail" type="text" class="form-control" id="reserveEmailInput">
                        <div class="muted">Необходимо будет подтвердить на старом и новом ящиках</div>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Сохранить">
                    </div>
                    <div class="form-group">
                        <linkButton href="/change_password" class="btn" id="changePasswordButton">Сменить пароль</linkButton>
                    </div>
                    <div class="form-group">
                        <linkButton href="/auth" class="btn btn-danger" id="logoutButton">Выйти</linkButton>
                    </div>
                    <div class="form-group" id="adminButton" style="display: none">
                        <linkButton href="/auth" class="btn" id="adminButton">На админскую</linkButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

export function source(element, router) {
    document.title = "LioKor | Профиль";
    element.innerHTML = html;

    let username = '';
    ajax('GET', '/api/user', null, (status, response) => {
        if (status === 200) { // is authorized
            document.getElementById("username").innerText = username = response.username;
            document.getElementById("email").innerText = response.username.toLowerCase() + '@liokor.ru';
            document.getElementById("fullnameInput").value = response.fullname;
            document.getElementById("reserveEmailInput").value = response.reserveEmail;

            if (response.isAdmin)
                document.getElementById("adminButton").style.display = "block";
        } else { // not authorized
            router.goto("/auth");
        }
    });

    document.getElementById("editProfileForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const fullname = document.getElementById("fullnameInput").value.trim();
        const reserveEmail = document.getElementById("reserveEmailInput").value.trim();
        ajax("PUT", "/api/user/" + username, {fullname, reserveEmail}, (status, response) => {
            if (status == 200) { // valide
                //document.getElementById("completeDataChange").innerText = "Не знаю, зачем тебе это, но данные изменены";
                alert("Не знаю, зачем тебе это, но данные изменены");
            } else { // invalide
                document.getElementById("fullnameErrorText").innerText = 'Неверные данные';
            }
        });
    });

    document.getElementById("editProfileForm").addEventListener("submit", (event) => {
        event.preventDefault();
        router.goto(document.location + '/password');
    });

    document.getElementById("logoutButton").addEventListener("click", (event) => {
        ajax("POST", "/api/user/logout", {}, (status, response) => {});
    });

    document.getElementById("avatarChange").addEventListener('click', async () => {
        const dataURL = await readImageAsDataURL();
        document.getElementById("avatarImage").src = dataURL;
        document.getElementById("avatarDataURL").value = dataURL;
    });
}