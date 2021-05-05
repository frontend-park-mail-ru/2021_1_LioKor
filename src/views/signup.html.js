import Handlebars from 'handlebars/dist/cjs/handlebars';

import { validatePassword, validateEmail, validateFullname } from '../modules/validators';

const html = `
<div class="signup">
    <div class="content">
        <div class="standalone-form">
            <div class="title">
                <div class="primary">Регистрация</div>
            </div>
            <div class="form">
                <form id="signupForm" novalidate>
                    <div class="form-group" id="usernameGroup">
                        <label>ЛОГИН*<span class="error-text" id="usernameErrorText"></span></label>
                        <input name="username" type="text" class="form-control" required>
                        <div class="muted">Минимум 3 символа, только буквы, цифры и _</div>
                        <div class="muted">Будет использоваться как часть адреса: login@liokor.ru</div>
                    </div>
                    <div class="form-group" id="passwordGroup">
                        <label>ПАРОЛЬ*<span class="error-text" id="passwordErrorText"></span></label>
                        <input name="password" type="password" class="form-control" required>
                        <div class="muted">{{ passwordRequirements }}</div>
                    </div>
                    <div class="form-group" id="passwordConfirmGroup">
                        <label>ПОДТВЕРЖДЕНИЕ ПАРОЛЯ*<span class="error-text" id="passwordConfirmErrorText"></span></label>
                        <input name="passwordConfirm" type="password" class="form-control" required>
                    </div>
                    <div class="form-group" id="fullnameGroup">
                        <label>ПОЛНОЕ ИМЯ<span class="error-text" id="fullnameErrorText"></span></label>
                        <input name="fullname" type="text" class="form-control" placeholder="Иван Иванов">
                        <div class="muted">Будет отображаться у получателей писем</div>
                    </div>
                    <div class="form-group" id="reserveEmailGroup">
                        <label>ЗАПАСНОЙ EMAIL<span class="error-text" id="reserveEmailErrorText"></span></label>
                        <input name="reserveEmail" type="email" class="form-control" placeholder="wolf@liokor.ru">
                        <div class="muted">Используется для восстановления пароля, если не указан - восстановить пароль крайне сложно</a>
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

/**
 * Renders signup page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export function handler(element, app) {
    document.title = `${app.name} | Регистрация`;

    const template = Handlebars.compile(html);
    element.innerHTML = template({
        passwordRequirements: validatePassword()
    });

    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameGroup = document.getElementById('usernameGroup');
        const usernameErrorText = document.getElementById('usernameErrorText');
        const passwordGroup = document.getElementById('passwordGroup');
        const passwordErrorText = document.getElementById('passwordErrorText');
        const passwordConfirmGroup = document.getElementById('passwordConfirmGroup');
        const passwordConfirmErrorText = document.getElementById('passwordConfirmErrorText');
        const fullnameGroup = document.getElementById('fullnameGroup');
        const fullnameErrorText = document.getElementById('fullnameErrorText');
        const reserveEmailGroup = document.getElementById('reserveEmailGroup');
        const reserveEmailErrorText = document.getElementById('reserveEmailErrorText');

        usernameGroup.classList.remove('error');
        usernameErrorText.innerHTML = '';
        passwordGroup.classList.remove('error');
        passwordErrorText.innerHTML = '';
        passwordConfirmGroup.classList.remove('error');
        passwordConfirmErrorText.innerHTML = '';
        fullnameGroup.classList.remove('error');
        fullnameErrorText.innerHTML = '';
        reserveEmailGroup.classList.remove('error');
        reserveEmailErrorText.innerHTML = '';

        const formData = new FormData(signupForm);
        const username = formData.get('username');
        const password = formData.get('password');
        const passwordConfirm = formData.get('passwordConfirm');
        const fullname = formData.get('fullname');
        const reserveEmail = formData.get('reserveEmail');

        if (!validatePassword(password)) {
            passwordGroup.classList.add('error');
            passwordErrorText.innerHTML = 'Пароль не удовлетворяет требованиям';
            return;
        }
        if (passwordConfirm !== password) {
            passwordConfirmGroup.classList.add('error');
            passwordConfirmErrorText.innerHTML = 'Не совпадает с паролем';
            return;
        }
        if (reserveEmail && !validateEmail(reserveEmail)) {
            reserveEmailGroup.classList.add('error');
            reserveEmailErrorText.innerHTML = 'Некорректный EMail';
            return;
        }
        if (fullname && !validateFullname(fullname)) {
            fullnameGroup.classList.add('error');
            fullnameErrorText.innerHTML = 'Некорректное полное имя';
            return;
        }

        const response = await app.apiPost('/user', {
            username,
            password,
            reserveEmail,
            fullname
        });

        switch (response.status) {
        case 200:
            app.messages.success('Ура!', `Аккаунт ${username} успешно создан!`);
            app.updateStorage(username);
            await app.goto('/');
            break;
        case 400:
            usernameGroup.classList.add('error');
            usernameErrorText.innerHTML = 'Некорректный логин';
            break;
        case 409:
            usernameGroup.classList.add('error');
            usernameErrorText.innerHTML = 'Логин уже занят';
            break;
        default:
            app.messages.error(`Ошибка ${response.status}!`, 'Произошла непредвиденная ошибка!');
        }
    });
}
