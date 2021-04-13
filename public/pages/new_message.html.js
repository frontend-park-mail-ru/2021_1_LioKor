import { validateEmail } from '../modules/validators.js';

const html = `
<div class="profile">
    <div class="content">
        <div class="standalone-form">
            <div class="title">
                <div class="primary">Новое письмо</div>
            </div>
            <div class="form">
                <form id="changePasswordForm" novalidate>
                    <div class="form-group" id="recipientGroup">
                        <label>ПОЛУЧАТЕЛЬ<span class="error-text" id="recipientErrorText"></span></label>
                        <input name="recipient" type="text" class="form-control">
                    </div>
                    <div class="form-group" id="subjectGroup">
                        <label>ТЕМА<span class="error-text" id="subjectErrorText"></span></label>
                        <input name="subject" type="text" class="form-control">
                    </div>
                    <div class="form-group" id="bodyGroup">
                        <label>ТЕКСТ<span class="error-text" id="bodyErrorText"></span></label>
                        <textarea name="body" class="form-control" required></textarea>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn" value="Отправить">
                    </div>
                    <div class="form-group">
                        <linkButton href="/messages" class="btn btn-danger">Отмена</linkButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;

/**
 * Renders change password page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function source(element, app) {
    if (!app.storage.username) {
        await app.goto('/auth');
        return;
    }

    document.title = `${app.name} | Новое письмо`;

    element.innerHTML = html;

    const changePasswordForm = document.getElementById('changePasswordForm');
    changePasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const recipientGroup = document.getElementById('recipientGroup');
        const recipientErrorText = document.getElementById('recipientErrorText');
        const subjectGroup = document.getElementById('subjectGroup');
        const subjectErrorText = document.getElementById('subjectErrorText');
        const bodyGroup = document.getElementById('bodyGroup');
        const bodyErrorText = document.getElementById('bodyErrorText');

        recipientGroup.classList.remove('error');
        recipientErrorText.innerHTML = '';
        subjectGroup.classList.remove('error');
        subjectErrorText.innerHTML = '';
        bodyGroup.classList.remove('error');
        bodyErrorText.innerHTML = '';

        const formData = new FormData(changePasswordForm);
        const recipient = formData.get('recipient');
        const subject = formData.get('subject');
        const body = formData.get('body');

        if (!validateEmail(recipient)) {
            recipientGroup.classList.add('error');
            recipientErrorText.innerHTML = 'Некорректный EMail';
            return;
        }
        if (!subject) {
            subjectGroup.classList.add('error');
            subjectErrorText.innerHTML = 'Поле не может быть пустым';
            return;
        }
        if (!body) {
            bodyGroup.classList.add('error');
            bodyErrorText.innerHTML = 'Поле не может быть пустым';
            return;
        }

        const response = await app.apiPost('/email', {
            recipient,
            subject,
            body
        });

        switch (response.status) {
        case 200:
            app.messageSuccess('Успех!', 'Письмо отправлено');
            await app.goto('/messages');
            break;
        default:
            app.messageError(`Ошибка ${response.status}!`, 'Не удалось отправить письмо');
        }
    });
}
