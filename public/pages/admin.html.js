import {ajax} from "../modules/ajax.js";

const html = `
<div class="left-item bg-left" style="padding: 20px; margin-top: 30px">
    <div class="title" style="margin-top: 10px" id="admin-title">Проверка доступа...</div>
</div>
<div><linkButton href="/me" class="fullwidth left-item text-big listing-item ptb20" style="margin-top: 50px; position: relative; display: block; background: linear-gradient(160deg, rgba(188,116,39, 0.3) 0%, rgba(31,26,9,0.2) 100%) 50% 50% no-repeat">
    <span class="title choose" style="margin: 0 30px; opacity: 100%"><span class="arrow left" style="display: inline-block"></span>В профиль</span>
</linkButton></div>

<div id="admin-body" style="display: none" class="form">
    <form id="autofill-form">
        <div class="center">
            <div class="title">Заполнить все поля ниже для...</div>
        </div>
        <div class="text">
            <div class="error" id="autofill-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="autofill-nickname-form" placeholder="Никнейм"></div>
        </div>
        <div class="text">
            <div class="success" id="autofill-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Заполнить"></div>
        </div>
    </form>
    
    <form id="quest-form" style="margin-top: 60px">
        <div class="center">
            <div class="title">Сменить квест</div>
        </div>
        <div class="text">
            <div class="error" id="quest-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="quest-nickname-form" placeholder="Никнейм"></div>
        </div>
        <div class="text">
            <div class="error" id="quest-questError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="quest-quest-form" placeholder="ID квеста"></div>
        </div>
        <div class="text">
            <div class="success" id="quest-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Изменить"></div>
        </div>
    </form>
    
    <form id="branch-form" style="margin-top: 60px">
        <div class="center">
            <div class="title">Сменить ветку</div>
        </div>
        <div class="text">
            <div class="error" id="branch-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="branch-nickname-form" placeholder="Никнейм"></div>
        </div>
        <div class="text">
            <div class="error" id="branch-branchError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="branch-branch-form" placeholder="ID ветки"></div>
        </div>
        <div class="text">
            <div class="success" id="branch-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Изменить"></div>
        </div>
    </form>
    
    <form id="progress-form" style="margin-top: 60px">
        <div class="center">
            <div class="title">Сменить прогресс</div>
        </div>
        <div class="text">
            <div class="error" id="progress-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="progress-nickname-form" placeholder="Никнейм"></div>
        </div>
        <div class="text">
            <div class="error" id="progress-progressError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="progress-progress-form" placeholder="Число прогресса"></div>
        </div>
        <div class="text">
            <div class="success" id="progress-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Изменить"></div>
        </div>
    </form>
    
    <form id="isFoundBonus-form" style="margin-top: 60px">
        <div class="center">
            <div class="title">Сменить нашёл ли бонус</div>
        </div>
        <div class="text">
            <div class="error" id="isFoundBonus-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="isFoundBonus-nickname-form" placeholder="Никнейм"></div>
        </div>
        <div class="text">
            <div class="error" id="isFoundBonus-isFoundBonusError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="isFoundBonus-isFoundBonus-form" placeholder="false / true"></div>
        </div>
        <div class="text">
            <div class="success" id="isFoundBonus-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Изменить"></div>
        </div>
    </form>
    
    <form id="admin-form" style="margin-top: 60px">
        <div class="center">
            <div class="title">Сменить права админа</div>
        </div>
        <div class="text">
            <div class="error" id="admin-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="admin-nickname-form" placeholder="Никнейм"></div>
        </div>
        <div class="text">
            <div class="error" id="admin-adminError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="admin-admin-form" placeholder="false / true"></div>
        </div>
        <div class="text">
            <div class="success" id="admin-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Изменить"></div>
        </div>
    </form>
    
    <form id="delete-form" style="margin-top: 60px">
        <div class="center">
            <div class="title">Удалить пользователя</div>
        </div>
        <div class="text">
            <div class="error" id="delete-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="delete-nickname-form" placeholder="Никнейм"></div>
        </div>
        <div class="text">
            <div class="success" id="delete-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Удалить"></div>
        </div>
    </form>
    
        
    <form id="answerAll-form" style="margin-top: 60px">
        <div class="center">
            <div class="title">Сменить итоговый ответ</div>
        </div>
        <div class="text">
            <div class="error" id="answerAll-nicknameError"></div>
            <div class="mtb20"><input class="fullwidth p10" type="text"  id="answerAll-answer-form" placeholder="ответы через пробел"></div>
        </div>
        <div class="text">
            <div class="success" id="answerAll-completeChange"></div>
            <div class="mtb20"><input class="submit fullwidth center p10" style="border-color: #b08946; outline: none" type="submit" value="Изменить"></div>
        </div>
    </form>
</div>

<div style="position: relative; text-align: center; margin: 30px">
    <linkButton class="submit p10" href="/about" style="border-radius: 10px; background: linear-gradient(90deg, rgba(71, 56, 20, 0.4) 0%, rgba(84,69,25,0.7) 100%) 50% 50% no-repeat">На главную</linkButton>
</div>
`;

export function source(element, router) {
    document.title = "АДМИН SQuest";
    element.innerHTML = html;

    ajax("GET", "/api/admin", null, (status, response) => {
        if (status == 200) { // valide
            document.getElementById("admin-title").innerText = "Админская страничка";
            document.getElementById("admin-body").style.display = "block";
        } else { // invalide
            if (response.nicknameError)
                document.getElementById("admin-title").innerText = response.nicknameError;
        }
    });

    document.getElementById("autofill-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const nickname = document.getElementById("autofill-nickname-form").value.trim();

        ajax("POST", "/api/admin/user", {nickname}, (status, response) => {
            if (status == 200) { // valide
                document.getElementById("autofill-completeChange").innerText = "Успешно заполнено";

                document.getElementById("quest-nickname-form").value = response.nickname;
                document.getElementById("branch-nickname-form").value = response.nickname;
                document.getElementById("progress-nickname-form").value = response.nickname;
                document.getElementById("isFoundBonus-nickname-form").value = response.nickname;
                document.getElementById("admin-nickname-form").value = response.nickname;
                //document.getElementById("delete-nickname-form").value = response.nickname;

                document.getElementById("quest-quest-form").value = response.quest;
                document.getElementById("branch-branch-form").value = response.branch;
                document.getElementById("progress-progress-form").value = response.progress;
                document.getElementById("isFoundBonus-isFoundBonus-form").value = response.isFoundBonus;
                document.getElementById("admin-admin-form").value = response.admin;
            } else { // invalide
                if (response.nicknameError)
                    document.getElementById("autofill-nicknameError").innerText = response.nicknameError;
            }
        });
    });

    document.getElementById("quest-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const nickname = document.getElementById("quest-nickname-form").value.trim();
        const quest = document.getElementById("quest-quest-form").value.trim();

        ajax("POST", "/api/admin/set-quest", {nickname, quest}, (status, response) => {
            if (status == 200) { // valide
                document.getElementById("quest-completeChange").innerText = "Успешно изменено";
            } else { // invalide
                if (response.nicknameError)
                    document.getElementById("quest-nicknameError").innerText = response.nicknameError;
                if (response.questError)
                    document.getElementById("quest-questError").innerText = response.questError;
            }
        });
    });

    document.getElementById("branch-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const nickname = document.getElementById("branch-nickname-form").value.trim();
        const branch = document.getElementById("branch-branch-form").value.trim();

        ajax("POST", "/api/admin/set-branch", {nickname, branch}, (status, response) => {
            if (status == 200) { // valide
                document.getElementById("branch-completeChange").innerText = "Успешно изменено";
            } else { // invalide
                if (response.nicknameError)
                    document.getElementById("branch-nicknameError").innerText = response.nicknameError;
                if (response.branchError)
                    document.getElementById("branch-branchError").innerText = response.branchError;
            }
        });
    });

    document.getElementById("progress-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const nickname = document.getElementById("progress-nickname-form").value.trim();
        const progress = document.getElementById("progress-progress-form").value.trim();

        ajax("POST", "/api/admin/set-progress", {nickname, progress}, (status, response) => {
            if (status == 200) { // valide
                document.getElementById("progress-completeChange").innerText = "Успешно изменено";
            } else { // invalide
                if (response.nicknameError)
                    document.getElementById("progress-nicknameError").innerText = response.nicknameError;
                if (response.progressError)
                    document.getElementById("progress-progressError").innerText = response.progressError;
            }
        });
    });

    document.getElementById("isFoundBonus-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const nickname = document.getElementById("isFoundBonus-nickname-form").value.trim();
        const isFoundBonus = document.getElementById("isFoundBonus-isFoundBonus-form").value.trim();

        ajax("POST", "/api/admin/set-isfoundbonus", {nickname, isFoundBonus}, (status, response) => {
            if (status == 200) { // valide
                document.getElementById("isFoundBonus-completeChange").innerText = "Успешно изменено";
            } else { // invalide
                if (response.nicknameError)
                    document.getElementById("isFoundBonus-nicknameError").innerText = response.nicknameError;
                if (response.isFoundBonusError)
                    document.getElementById("isFoundBonus-isFoundBonusError").innerText = response.isFoundBonusError;
            }
        });
    });
    
    document.getElementById("admin-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const nickname = document.getElementById("admin-nickname-form").value.trim();
        const admin = document.getElementById("admin-admin-form").value.trim();

        ajax("POST", "/api/admin/set-admin", {nickname, admin}, (status, response) => {
            if (status == 200) { // valide
                document.getElementById("admin-completeChange").innerText = "Успешно изменено";
            } else { // invalide
                if (response.nicknameError)
                    document.getElementById("admin-nicknameError").innerText = response.nicknameError;
                if (response.adminError)
                    document.getElementById("admin-adminError").innerText = response.adminError;
            }
        });
    });

    document.getElementById("delete-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const nickname = document.getElementById("delete-nickname-form").value.trim();

        ajax("POST", "/api/admin/delete-user", {nickname}, (status, response) => {
            if (status == 200) { // valide
                document.getElementById("delete-completeChange").innerText = "Успешно изменено";
            } else { // invalide
                if (response.nicknameError)
                    document.getElementById("delete-nicknameError").innerText = response.nicknameError;
            }
        });
    });
}