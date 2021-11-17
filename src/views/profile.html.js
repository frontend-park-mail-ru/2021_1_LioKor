import Handlebars from 'handlebars/dist/cjs/handlebars';

import { getImageAsDataURL } from '@korolion/get-image-as-dataurl/getImageAsDataUrl.js';
import { validateEmail, validateFullname } from '../modules/validators';

const html = `
<div class="profile">
    <div class="content">
        <div class="standalone-form profile">
            <LinkButton href="/" class="back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg>
            </LinkButton>

            <div class="title">
                <div class="avatar">
                    <img id="avatarImage" src="{{ avatarUrl }}" alt="avatar">
                    <div id="avatarChange" class="cover">
                        Изменить
                    </div>
                </div>
                <div class="primary" id="username">{{ username }}</div>
                <div class="secondary" style="text-transform: lowercase;">{{ username }}@liokor.ru</div>
            </div>
            <div class="form">
                <form id="editProfileForm" novalidate>
                    <input name="avatarDataURL" type="hidden" id="avatarDataURL">

                    <div class="form-group" id="fullnameGroup">
                        <label>ПОЛНОЕ ИМЯ<span class="error-text" id="fullnameErrorText"></span></label>
                        <input name="fullname" type="text" class="form-control" value="{{ fullname }}">
                    </div>
                    <div class="form-group" id="reserveEmailGroup">
                        <label>ЗАПАСНОЙ E-MAIL<span class="error-text" id="reserveEmailErrorText"></span></label>
                        <input name="reserveEmail" type="email" class="form-control" value="{{ reserveEmail }}">
                        <!-- <div class="muted">Необходимо будет подтвердить на старом и новом ящиках</div> -->
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Сохранить">
                    </div>
                    <div class="form-group">
                        <LinkButton href="/user/{{ username }}/password" class="btn" id="changePasswordButton">Сменить пароль</LinkButton>
                    </div>
                    <div class="form-group">
                        <button href="/auth" class="btn btn-danger" id="logoutButton">Выйти</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

/**
 * Renders profile page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    document.title = `${app.name} | Профиль`;

    const response = await app.apiGet('/user');
    if (!response.ok) {
        await app.goto('/auth');
        return;
    }
    const data = await response.json();
    const { username, avatarUrl } = data;
    app.updateStorage(username, avatarUrl);

    const template = Handlebars.compile(html);
    element.innerHTML = template({
        username: username,
        fullname: data.fullname,
        reserveEmail: data.reserveEmail,
        avatarUrl: (avatarUrl.length > 0) ? `${app.apiUrl}/${avatarUrl}` : app.defaultAvatarUrl
    });

    const avatarDataURL = document.getElementById('avatarDataURL');
    if (avatarUrl) {
        avatarDataURL.value = avatarUrl;
    }

    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fullnameGroup = document.getElementById('fullnameGroup');
        const fullnameErrorText = document.getElementById('fullnameErrorText');
        const reserveEmailGroup = document.getElementById('reserveEmailGroup');
        const reserveEmailErrorText = document.getElementById('reserveEmailErrorText');

        fullnameGroup.classList.remove('error');
        fullnameErrorText.innerHTML = '';
        reserveEmailGroup.classList.remove('error');
        reserveEmailErrorText.innerHTML = '';

        const formData = new FormData(editProfileForm);
        const fullname = formData.get('fullname').trim();
        const reserveEmail = formData.get('reserveEmail').trim();

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

        const response = await app.apiPut(`/user/${username}`, { fullname, reserveEmail });
        if (!response.ok) {
            app.messages.error(`Ошибка ${response.status}!`, 'Не удалось изменить данные!');
            return;
        }
        app.messages.success('Успех!', 'Данные успешно изменены!');
    });

    document.getElementById('logoutButton').addEventListener('click', async (event) => {
        event.preventDefault();
        await app.apiDelete('/user/session');
        app.clearStorage();
        app.messages.success('До свидания!', 'Вы успешно вышли из аккаунта!');
        await app.goto('/auth');
    });

    const avatarImage = document.getElementById('avatarImage');
    document.getElementById('avatarChange').addEventListener('click', async () => {
        // if "Cancel" button will be pressed - Promise never resolves, but there's no event to resolve on cancel =(
        let dataURL;
        try {
            dataURL = await getImageAsDataURL();
        } catch (err) {
            app.messages.error('Ошибка', err.toString());
            return;
        }
        if (avatarDataURL.value === dataURL) {
            app.messages.success('Успех', 'Данный аватар уже установлен!');
            return;
        }

        avatarDataURL.value = dataURL;

        const formData = new FormData(editProfileForm);
        const avatarUrl = formData.get('avatarDataURL');

        const response = await app.apiPut(`/user/${username}/avatar`, { avatarUrl });
        if (response.ok) {
            app.storage.avatar = avatarUrl;
            avatarImage.src = dataURL;
            app.messages.success('Успех', 'Аватар успешно изменён');
        } else {
            app.messages.error('Ошибка', 'Не удалось изменить аватар!');
        }
    });
}
