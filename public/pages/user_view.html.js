import { ajax } from '../modules/ajax.js';

const html = `
<div class="profile">

    <div class="content">
        <div class="standalone-form profile">
            <div class="title">
                <div class="avatar">
                    <img id="avatarImage" src="../images/avatar.jpg">
                </div>
                <div class="primary" id="username"></div>
                <div class="secondary" id="email"></div>
            </div>
            <div class="form">
                <form id="editProfileForm">
                    <input name="avatarDataURL" type="hidden" id="avatarDataURL">

                    <div class="form-group" id="fullnameGroup">
                        <label>ПОЛНОЕ ИМЯ<span class="error-text" id="fullnameErrorText"></span></label>
                        <input disabled name="fullname" type="text" class="form-control" id="fullnameInput">
                    </div>
                    <div class="form-group" id="reserveEmailGroup">
                        <label>ЗАПАСНОЙ E-MAIL<span class="error-text" id="reserveEmailErrorText"></span></label>
                        <input disabled name="reserveEmail" type="text" class="form-control" id="reserveEmailInput">
                    </div>
                    <div class="form-group">
                        <linkButton href="/user" class="btn btn-danger" id="logoutButton">К себе</linkButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

export function source(element, router) {
    document.title = 'LioKor | Профиль ' + location.pathname.substring(6);
    element.innerHTML = html;

    document.getElementById('main').style.backgroundColor = '#404244';

    ajax('GET', '/api' + location.pathname.toLowerCase(), null, (status, response) => {
        if (status === 200) { // is found
            document.getElementById('username').innerText = response.username;
            document.getElementById('email').innerText = response.username + '@liokor.ru';
            document.getElementById('fullnameInput').value = response.fullname;
            document.getElementById('reserveEmailInput').value = response.reserveEmail;

            if (response.isAdmin) { document.getElementById('adminButton').style.display = 'block'; }
        } else { // not found
            document.getElementById('username').innerText = 'Не найден';
        }
    });
}
