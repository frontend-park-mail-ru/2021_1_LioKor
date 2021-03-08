import {ajax} from "../modules/ajax.js";

const html = `
<div class="auth">
    <!-- <img class="wolf" src="../images/wolf_dark.png"> -->

    <div class="content">
        <div class="standalone-form">
            <form id="authForm">
                <div class="title">
                    <div class="primary">Вход</div>
                    <div class="secondary">Рады видеть вас снова!</div>
                </div>
                <div class="form">
                    <div class="form-group" id="usernameGroup">
                        <label>ЛОГИН ИЛИ EMAIL<span class="error-text" id="usernameErrorText"></span></label>
                        <input name="username" type="text" class="form-control" id="usernameInput" required>
                    </div>
                    <div class="form-group" id="passwordGroup">
                        <label>ПАРОЛЬ<span class="error-text" id="passwordErrorText"></span></label>
                        <input name="password" type="password" class="form-control" id="passwordInput" required>
                        <div class="muted"><linkButton href="#">Забыли пароль?</linkButton>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Войти">
                        <div class="muted">Нужен аккаунт? <linkButton href="/signup">Создать</linkButton></div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
`;

export function source(element, router) {
    document.title = "LioKor | Авторизация";
    element.innerHTML = html;
    document.getElementById("usernameInput").focus();

    document.getElementById("main").style.backgroundColor = "transparent";

    ajax('GET', '/api/user', null, (status, response) => {
        if (status === 200) // is authorized
            router.goto("/user");
    });

    document.getElementById("authForm").addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById("usernameInput").value.trim();
        const password = document.getElementById("passwordInput").value.trim();
        if (username.length < 3) {
            document.getElementById("usernameGroup").classList.add('error');
            document.getElementById("usernameErrorText").innerHTML = 'Слишком короткий логин';
            return;
        }

        ajax("POST", "/api/user/auth", {username, password}, (status, response) => {
            if (status === 200) { // valid
                router.goto("/user");
            } else if (status === 400) { // invalid
                document.getElementById("usernameErrorText").innerText = "Запрос на сервер не по форме";
            } else {
                document.getElementById("usernameErrorText").innerText = "Неправильный логин или пароль";
            }
        });
    });
}
