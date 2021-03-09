import { readImageAsDataURL } from '../modules/images.js';

const DEFAULT_AVATAR_URL = '../images/default-avatar.jpg';

const html = `
<div class="profile">
    <div class="content">
        <div class="standalone-form profile">
            <div class="title">
                <div class="avatar">
                    <img id="avatarImage" src="{{ avatarUrl }}">
                    <div id="avatarChange" class="cover">
                        Изменить
                    </div>
                </div>
                <div class="primary" id="username">{{ username }}</div>
                <div class="secondary" style="text-transform: lowercase;">{{ username }}@liokor.ru</div>
            </div>
            <div class="form">
                <form id="editProfileForm">
                    <input name="avatarDataURL" type="hidden" id="avatarDataURL">

                    <div class="form-group" id="fullnameGroup">
                        <label>ПОЛНОЕ ИМЯ<span class="error-text" id="fullnameErrorText"></span></label>
                        <input name="fullname" type="text" class="form-control" value="{{ fullname }}">
                    </div>
                    <div class="form-group" id="reserveEmailGroup">
                        <label>ЗАПАСНОЙ E-MAIL<span class="error-text" id="reserveEmailErrorText"></span></label>
                        <input name="reserveEmail" type="email" class="form-control" value="{{ reserveEmail }}">
                        <div class="muted">Необходимо будет подтвердить на старом и новом ящиках</div>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Сохранить">
                    </div>
                    <div class="form-group">
                        <LinkButton href="/user/{{ username }}/password" class="btn" id="changePasswordButton">Сменить пароль</LinkButton>
                    </div>
                    <div class="form-group">
                        <linkButton href="/auth" class="btn btn-danger" id="logoutButton">Выйти</linkButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

export async function source(element, app) {
    document.title = `${app.name} | Профиль`;

    const response = await app.apiGet('/user');
    if (!response.ok) {
        app.goto('/auth');
        return;
    }
    const data = await response.json();
    let { username, avatarUrl } = data;
    if (!avatarUrl) {
        avatarUrl = DEFAULT_AVATAR_URL;
    }

    const template = Handlebars.compile(html);
    element.innerHTML = template({
        username: username,
        fullname: data.fullname,
        reserveEmail: data.reserveEmail
    });

    const avatarImage = document.getElementById('avatarImage');
    const avatarDataURL = document.getElementById('avatarDataURL');
    if (avatarUrl) {
        avatarImage.src = avatarUrl;
        avatarDataURL.value = avatarUrl;
    }

    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(editProfileForm);
        const avatarUrl = formData.get('avatarDataURL');
        const fullname = formData.get('fullname').trim();
        const reserveEmail = formData.get('reserveEmail').trim();

        const response = await app.apiPut(`/user/${username}`, { fullname, avatarUrl, reserveEmail });
        if (!response.ok) {
            alert('Не удалось изменить данные!');
        }
    });

    document.getElementById('logoutButton').addEventListener('click', (event) => {
        app.apiDelete('/user/session');
    });

    document.getElementById('avatarChange').addEventListener('click', async () => {
        const dataURL = await readImageAsDataURL();
        avatarImage.src = dataURL;
        avatarDataURL.value = dataURL;
    });
}
