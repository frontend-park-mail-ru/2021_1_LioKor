import { request } from '../modules/requests.js';

const html = `
<div class="auth">
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
                        <input name="password" type="password" class="form-control" required>
                        <!-- <div class="muted"><linkButton href="#">Забыли пароль?</linkButton> -->
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

export async function source(element, router) {
    document.title = 'LioKor | Авторизация';
    element.innerHTML = html;

    const response = await request('GET', '/api/user');
    if (response.ok) {
        // authenticated => redirecting to profile
        router.goto('/user');
    }

    const authForm = document.getElementById('authForm');
    authForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(authForm);
        // both KoroLion and KoroLion@liokor.ru are correct usernames
        const username = formData.get('username').toLowerCase().replace('@liokor.ru', '');
        const password = formData.get('password');

        const response = await request('POST', '/api/user/auth', { username, password });

        if (response.ok) {
            router.goto('/user');
        } else {
            document.getElementById('usernameGroup').classList.add('error');
            document.getElementById('usernameErrorText').innerText = 'Неправильный логин или пароль';
            document.getElementById('passwordGroup').classList.add('error');
            document.getElementById('passwordErrorText').innerText = 'Неправильный логин или пароль';
        }
    });
}
