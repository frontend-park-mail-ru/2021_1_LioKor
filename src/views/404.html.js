const html = `
<div class="view404">
    <div class="content">
        <div class="standalone-form">
            <div class="title">
                <div class="primary">Ошибка 404</div>
                <div class="secondary">Страница не найдена!</div>
            </div>
            <div class="form" style="margin-top: 50px;">
                <linkbutton href="/messages" class="btn">На главную</linkbutton>
            </div>
        </div>
    </div>
</div>
`;

/**
 * Renders auth page and "activating" it's js
 *
 * @param {object} element html element to be rendered in
 * @param {object} app object of a main App class
 */
export async function handler(element, app) {
    document.title = `${app.name} | 404`;
    element.innerHTML = html;
}
