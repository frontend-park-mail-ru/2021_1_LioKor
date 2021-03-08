import { request } from '../modules/requests.js';
import { validatePassword } from '../modules/validators.js';

const html = `
<div class="profile">
    <div class="content">
        <div class="standalone-form">
            <div class="title">
                <div class="primary">Смена пароля</div>
            </div>
            <div class="form">
                <form id="changePasswordForm">
                    <div class="form-group" id="oldPasswordGroup">
                        <label>СТАРЫЙ ПАРОЛЬ<span class="error-text" id="oldPasswordErrorText"></span></label>
                        <input name="oldPassword" type="password" class="form-control">
                    </div>
                    <div class="form-group" id="newPasswordGroup">
                        <label>НОВЫЙ ПАРОЛЬ<span class="error-text" id="newPasswordErrorText"></span></label>
                        <input name="newPassword" type="password" class="form-control">
                        <div class="muted">Минимум 8 символов, 2 буквы разного регистра и 1 цифра</div>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Сменить пароль">
                    </div>
                    <div class="form-group">
                        <linkButton href="/user" class="btn btn-danger">Отмена</linkButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

export function source(element, router) {
    document.title = 'LioKor | Cменить пароль';
    element.innerHTML = html;

    const changePasswordForm = document.getElementById('changePasswordForm');
    changePasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const oldPasswordGroup = document.getElementById('oldPasswordGroup');
        const oldPasswordErrorText = document.getElementById('oldPasswordErrorText');
        const newPasswordGroup = document.getElementById('newPasswordGroup');
        const newPasswordErrorText = document.getElementById('newPasswordErrorText');

        oldPasswordGroup.classList.remove('error');
        oldPasswordErrorText.innerHTML = '';
        newPasswordGroup.classList.remove('error');
        newPasswordErrorText.innerHTML = '';

        const formData = new FormData(changePasswordForm);
        const oldPassword = formData.get('oldPassword');
        const newPassword = formData.get('newPassword');

        if (!validatePassword(newPassword)) {
            newPasswordGroup.classList.add('error');
            newPasswordErrorText.innerHTML = 'Пароль не удовлетворяет требованиям';
            return;
        }

        const response = await request('PUT', `/api${location.pathname}`, {
            oldPassword,
            newPassword
        });

        switch (response.status) {
        case 200:
            router.goto('/user');
            break;
        case 400:
        case 401:
            oldPasswordGroup.classList.add('error');
            oldPasswordErrorText.innerHTML = 'Введён неверный пароль!';
            break;
        case 404:
            alert('Непредвиденная ошибка: пользователь не найден!');
            break;
        }
    });
}
