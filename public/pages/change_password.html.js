import {ajax} from "../modules/ajax.js";

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
        <div class="standalone-form">
            <div class="title">
                <div class="primary">Смена пароля</div>
            </div>
            <div class="form">
                <form id="editProfileForm">
                    <div class="form-group" id="fullnameGroup">
                        <label>СТАРЫЙ ПАРОЛЬ<span class="error-text" id="oldPasswordErrorText"></span></label>
                        <input name="oldPassword" type="password" class="form-control" id="oldPasswordInput">
                    </div>
                    <div class="form-group" id="reserveEmailGroup">
                        <label>НОВЫЙ ПАРОЛЬ<span class="error-text" id="newPasswordErrorText"></span></label>
                        <input name="newPassword" type="password" class="form-control" id="newPasswordInput">
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Сменить пароль">
                    </div>
                    <div class="form-group">
                        <a href="/templates/profile.html" class="btn btn-danger">Отмена</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

export function source(element, router) {
    document.title = "LioKor | Cменить пароль";
    element.innerHTML = html;
    document.getElementById("usernameInput").focus();

    ajax('GET', '/api/user', null, (status, response) => {
        if (status === 200) // is authorized
            router.goto("/profile");
    });

    document.getElementById("authForm").addEventListener('submit', (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById("oldPasswordInput").value.trim();
        const newPassword = document.getElementById("newPasswordInput").value.trim();

        ajax("POST", document.location, {oldPassword, newPassword}, (status, response) => {
            if (status === 200) { // valid
                alert("Пароль изменён");
            } else if (status === 400) { // invalid
                document.getElementById("usernameErrorText").innerText = "Неправильный пароль";
            } else if (status === 401) { // invalid
                document.getElementById("usernameErrorText").innerText = "У вас нет доступа";
            } else {
                document.getElementById("usernameErrorText").innerText = "Пользователь не найден";
            }
        });
    });
}