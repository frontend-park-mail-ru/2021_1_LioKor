import { request } from '../modules/requests.js';
import { validatePassword } from '../modules/validators.js';

const html = `
<div class="signup">
    <div class="content">
        <div class="standalone-form">
            <div class="title">
                <div class="primary">Регистрация</div>
            </div>
            <div class="form">
                <form id="signupForm">
                    <div class="form-group" id="usernameGroup">
                        <label>ЛОГИН*<span class="error-text" id="usernameErrorText"></span></label>
                        <input name="username" type="text" class="form-control" required>
                        <div class="muted">Минимум 3 символа, только буквы, цифры и _</div>
                        <div class="muted">Будет использоваться как часть адреса: login@liokor.ru</div>
                    </div>
                    <div class="form-group" id="passwordGroup">
                        <label>ПАРОЛЬ*<span class="error-text" id="passwordErrorText"></span></label>
                        <input name="password" type="password" class="form-control" required>
                        <div class="muted">Минимум 8 символов, 2 буквы разного регистра и 1 цифра</div>
                    </div>
                    <div class="form-group" id="fullnameGroup">
                        <label>ПОЛНОЕ ИМЯ<span class="error-text" id="fullnameErrorText"></span></label>
                        <input name="fullname" type="text" class="form-control" placeholder="Иван Иванов">
                        <div class="muted">Будет отображаться у получателей писем</div>
                    </div>
                    <div class="form-group" id="reserveEmailGroup">
                        <label>ЗАПАСНОЙ EMAIL<span class="error-text" id="passwordErrorText"></span></label>
                        <input name="reserveEmail" type="email" class="form-control" placeholder="wolf@liokor.ru">
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

export function source(element, router) {
    document.title = 'LioKor | Регистрация';
    element.innerHTML = html;

    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameGroup = document.getElementById('usernameGroup');
        const usernameErrorText = document.getElementById('usernameErrorText');
        const passwordGroup = document.getElementById('passwordGroup');
        const passwordErrorText = document.getElementById('passwordErrorText');

        usernameGroup.classList.remove('error');
        usernameErrorText.innerHTML = '';
        passwordGroup.classList.remove('error');
        passwordErrorText.innerHTML = '';

        const formData = new FormData(signupForm);
        const username = formData.get('username');
        const password = formData.get('password');
        const fullname = formData.get('fullname');
        const reserveEmail = formData.get('reserveEmail');

        if (!validatePassword(password)) {
            passwordGroup.classList.add('error');
            passwordErrorText.innerHTML = 'Пароль не удовлетворяет требованиям';
            return;
        }

        const response = await request('POST', '/api/user', {
            username,
            password,
            reserveEmail,
            fullname
        });

        switch (response.status) {
        case 200:
            router.goto('/auth');
            break;
        case 400:
            usernameGroup.classList.add('error');
            usernameErrorText.innerHTML = 'Логин некорректен';
            break;
        case 409:
            usernameGroup.classList.add('error');
            usernameErrorText.innerHTML = 'Логин уже занят';
            break;
        }
    });
}
