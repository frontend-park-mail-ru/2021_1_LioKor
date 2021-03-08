import { ajax } from '../modules/ajax.js';

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
                        <input name="oldPassword" type="password" class="form-control" id="oldPasswordInput">
                    </div>
                    <div class="form-group" id="newPasswordGroup">
                        <label>НОВЫЙ ПАРОЛЬ<span class="error-text" id="newPasswordErrorText"></span></label>
                        <input name="newPassword" type="password" class="form-control" id="newPasswordInput">
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
    document.getElementById('oldPasswordInput').focus();

    document.getElementById('main').style.backgroundColor = '#404244';

    document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById('oldPasswordInput').value.trim();
        const newPassword = document.getElementById('newPasswordInput').value.trim();

        ajax('PUT', '/api' + location.pathname, { oldPassword, newPassword }, (status, response) => {
            if (status === 200) { // valid
                alert('Пароль изменён');
                router.goto('/user');
            } else if (status === 400) { // invalid
                document.getElementById('oldPasswordErrorText').innerText = 'Неправильный пароль';
            } else if (status === 401) { // invalid
                document.getElementById('oldPasswordErrorText').innerText = 'У вас нет доступа';
            } else if (status === 403) {
                document.getElementById('newPasswordErrorText').innerText = 'Неправильный формат ввода';
            } else if (status === 404) {
                document.getElementById('oldPasswordErrorText').innerText = 'Неизвестная ошибка ' + status;
            }
        });
    });
}
