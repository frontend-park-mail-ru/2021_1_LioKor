import { ajax } from '../modules/ajax.js';

const html = `
<div class="signup">
    <!-- <img class="wolf" src="../images/wolf_dark.png"> -->

    <div class="content">
        <div class="standalone-form">
            <div class="title">
                <div class="primary">Регистрация</div>
            </div>
            <div class="form">
                <form id="signupForm">
                    <div class="form-group" id="usernameGroup">
                        <label>ЛОГИН*<span class="error-text" id="usernameErrorText"></span></label>
                        <input name="username" type="text" class="form-control" id="usernameInput" required>
                        <div class="muted">Будет использоваться как часть адреса: login@liokor.ru</div>
                    </div>
                    <div class="form-group" id="passwordGroup">
                        <label>ПАРОЛЬ*<span class="error-text" id="passwordErrorText"></span></label>
                        <input name="password" type="password" class="form-control" id="passwordInput" required>
                        <div class="muted">8 символов, минимум 2 буквы разного регистра и 1 цифра</a>
                    </div>
                    <div class="form-group" id="fullnameGroup">
                        <label>ПОЛНОЕ ИМЯ<span class="error-text" id="fullnameErrorText"></span></label>
                        <input name="fullname" type="text" class="form-control" placeholder="Иван Иванов" id="fullnameInput">
                        <div class="muted">Будет отображаться у получателей писем</div>
                    </div>
                    <div class="form-group" id="passwordGroup">
                        <label>ЗАПАСНОЙ EMAIL<span class="error-text" id="passwordErrorText"></span></label>
                        <input name="reserveEmail" type="text" class="form-control" placeholder="wolf@liokor.ru" id="reserveEmailInput">
                        <div class="muted">Используется для восстановления пароля, если не указан - пароль восстановить невозможно</a>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Создать">
                        <div class="muted">Уже с нами? <linkButton href="/auth">Войти</linkButton></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

export function source (element, router) {
    document.title = 'LioKor | Регистрация';
    element.innerHTML = html;

    document.getElementById('main').style.backgroundColor = 'transparent';

    document.getElementById('signupForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();
        const password = document.getElementById('passwordInput').value.trim();
        const fullname = document.getElementById('fullnameInput').value.trim();
        const reserveEmail = document.getElementById('reserveEmailInput').value.trim();

        ajax('POST', '/api/user', { username, password, reserveEmail, fullname }, (status, response) => {
            if (status == 200) { // valide
                router.goto('/user');
            } else { // invalide
                if (response.nicknameError) { document.getElementById('nicknameError').innerText = response.nicknameError; }
                if (response.passwordError) { document.getElementById('passwordError').innerText = response.passwordError; }
                if (response.emailError) { document.getElementById('emailError').innerText = response.emailError; }
            }
        });
    });
}
