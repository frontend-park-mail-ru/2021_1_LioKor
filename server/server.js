'use strict';

const express = require('express');
//const https = require( "https" ); // для организации https
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(morgan('dev'));
app.use(body.json());
app.use(cookie());

const users = {
    'TyapkinS': {
        username: 'TyapkinS',
        password: 'password',
        fullname: "Tyapkin Sergey",
        reserveEmail: "Tyapkin2002@mail.ru",
        rating: 300,
        isAdmin: true,
    },
};
const usernames = {};


app.post('/api/user/auth', (req, res) => {
    const password = req.body.password;
    const username = req.body.username;
    if (!username)
        return res.status(403).json({usernameError: 'Тебе не кажется, что чего-то не хватает?'});
    if (!password)
        return res.status(403).json({passwordError: 'Тебе не кажется, что чего-то не хватает?'});
    if (!users[username])
        return res.status(403).json({usernameError: 'Такого пользователя нет'});
    if (users[username].password !== password)
        return res.status(403).json({passwordError: 'Пароль не подходит'});

    const id = uuid.v4();
    usernames[id] = username;

    res.cookie('userId', id, {maxAge: 1000 * 60 * 60 * 24 * 7}); // on week
    res.status(200).end();
});

app.post('/api/user/logout', (req, res) => {
    delete usernames[req.cookies['userId']];

    res.cookie('userId', null, {maxAge: -1});
    res.status(200).end();
});

app.post('/api/user', (req, res) => {
    const username = req.body.username;
    const fullname = req.body.fullname;
    const password = req.body.password;
    const reserveEmail = req.body.reserveEmail.toLowerCase();

    if (!username)
        return res.status(403).json({usernameError: 'А чё, а где имя пользователя?'});
    if (!password)
        return res.status(403).json({passwordError: 'А чё, а где пароль?'});
    if (!reserveEmail)
        return res.status(403).json({emailError: 'А чё, а где reserveEmail?'});
    if (username.length > 16)
        return res.status(403).json({usernameError: 'Уложи свой полёт фантазии в 16 символов пж'});
    if (password.length > 30)
        return res.status(403).json({passwordError: 'Длинновато. Больше 30 символов не влезет'});
    if (reserveEmail.length > 30)
        return res.status(403).json({emailError: 'Длинновато. Больше 30 символов не влезет'});
    if (password.length < 4)
        return res.status(403).json({passwordError: 'Пароль коротковат, надо хотя бы 4 с̶м̶ символа'});
    if (!reserveEmail.match(/@/))
        return res.status(403).json({emailError: 'Не обманывай, reserveEmail не настоящий.'});

    if (users[username])
        return res.status(403).json({usernameError: 'Художественный фильм: "у̶к̶р̶а̶л̶и̶ имя пользователя". (оно занято)'});
    for (const [, userData] of Object.entries(users))
        if (userData.reserveEmail === reserveEmail)
            return res.status(403).json({emailError: 'На этот reserveEmail уже зарегистрирован пользователь "' + userData.username + '"'});

    users[username] = {username: username, password: password, rating: 0, isAdmin: false, fullname: fullname, reserveEmail: reserveEmail,}; // create new user
    const id = uuid.v4();
    usernames[id] = username;

    res.cookie('userId', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
    res.status(200).end();
});

app.get('/api/user', (req, res) => {
    const id = req.cookies['userId'];
    const username = usernames[id];
    if (!username || !users[username])
        return res.status(401).json({error: 'Не авторизован или пользователя ' + username + ' нет.'});

    const user = {};
    Object.assign(user, users[username]);
    delete user.password;

    res.status(200).json(user).end();
});

app.put('/api/user/*/password', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(401).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});

    let username = req.url.substring(10);
    username = username.substr(0, username.length - 9);
    console.log(username);
    if (!users[username])
        return res.status(404).json({passwordError: 'Такого пользователя нет'});

    const password = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    if (users[usernames[id]].password !== password)
        return res.status(400).json({passwordError: 'Пароль не подходит'});
    if (usernames[id] !== username)
        return res.status(401).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});
    if (!newPassword)
        return res.status(403).json({newPasswordError: 'Без пароля нельзя'});
    if (newPassword.length > 30)
        return res.status(403).json({newPasswordError: 'Длинновато. Больше 30 символов не влезет'});
    if (newPassword.length < 4)
        return res.status(403).json({newPasswordError: 'Пароль коротковат, надо хотя бы 4 с̶м̶ символа'});

    if (newPassword === password)
        return res.status(403).json({passwordError: 'Пароли совпадают. (Шо то - фигня, шо то - фигня)', newPasswordError: ''});

    users[usernames[id]].password = newPassword;

    res.status(200).end();
});

app.put('/api/user/*', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});

    const username = usernames[id];
    const password = users[usernames[id]].password;
    const prevFullname = users[usernames[id]].fullname;
    const prevEmail = users[usernames[id]].email;

    const fullname = req.body.fullname;
    const email = req.body.reserveEmail.toLowerCase();

    if (!fullname)
        return res.status(403).json({usernameError: 'Пустое имя пользователя занято оригинальным админом'});
    if (!email)
        return res.status(403).json({emailError: 'Без email\'а нельзя'});
    if (fullname.length > 16)
        return res.status(403).json({usernameError: 'Уложи свой полёт фантазии в 16 символов пж'});
    if (email.length > 30)
        return res.status(403).json({emailError: 'Длинновато. Больше 30 символов не влезет'});
    if (!email.match(/@/))
        return res.status(403).json({emailError: 'Не обманывай, email не настоящий'});

    if (prevFullname !== fullname && users[fullname])
        return res.status(403).json({usernameError: 'Художественный фильм: "у̶к̶р̶а̶л̶и̶ имя пользователя". (оно занято)'});

    if (prevEmail !== email)
        for (const [, userData] of Object.entries(users))
            if (userData.email === email)
                return res.status(403).json({emailError: 'На этот email уже зарегистрирован пользователь "' + userData.fullname + '"'});

    if (prevFullname === fullname && prevEmail === email)
        return res.status(403).json({usernameError: 'Зачем кнопку теребишь, если не поменял ничего?', emailError: ''});

    delete users[usernames[id]];
    users[username] = {username: username, fullname: fullname, password: password, rating: 0, isAdmin: false, reserveEmail: email,}; // create new user
    usernames[id] = username;

    res.cookie('userId', id, {maxAge: 1000 * 60 * 10});
    res.status(200).end();
});

app.post('/api/me/check-password', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({passwordError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});

    const password = req.body.password;

    if (users[usernames[id]].password !== password)
        return res.status(403).json({passwordError: 'Пароль не подходит'});

    res.status(200).end();
});

app.get('/api/rating', (req, res) => {
    const rates = [];
    for (const [, userData] of Object.entries(users)) {
        rates.push({username: userData.username, rating: userData.rating});
    }
    rates.sort((a, b) => {
        return b.rating - a.rating;
    });
    res.status(200).json({users: rates}).end();
});



app.get('/api/admin', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({usernameError: 'Не авторизован или сессия устарела. В доступе отказано'});
    if (!users[usernames[id]].admin)
        return res.status(403).json({usernameError: 'Ты не админ. Таким сюда низя. В доступе отказано'});

    res.status(200).end();
});

app.post('/api/admin/user', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});
    if (!users[usernames[id]].admin)
        return res.status(403).json({usernameError: 'Ты не админ. Таким сюда низя'});

    const username = req.body.username;
    if (!username)
        return res.status(403).json({usernameError: 'Тебе не кажется, что чего-то не хватает?'});
    if (!users[username])
        return res.status(403).json({usernameError: 'Такого пользователя нет'});

    res.status(200).json(users[req.body.username]).end();
});

app.get('/api/admin/users', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});
    if (!users[usernames[id]].admin)
        return res.status(403).json({usernameError: 'Вы не админ. Таким сюда низя'});

    res.status(200).json(users).end();
});

app.get('/api/admin/quests', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});
    if (!users[usernames[id]].admin)
        return res.status(403).json({usernameError: 'Вы не админ. Таким сюда низя'});

    res.status(200).json(quests).end();
});


app.post('/api/admin/set-isAdmin', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});
    if (!users[usernames[id]].admin)
        return res.status(403).json({usernameError: 'Вы не админ. Таким сюда низя'});

    const isAdmin = req.body.admin.toLowerCase();
    const username = req.body.username;
    if (!username)
        return res.status(403).json({usernameError: 'Тебе не кажется, что чего-то не хватает?'});
    if (!isAdmin)
        return res.status(403).json({adminError: 'Тебе не кажется, что чего-то не хватает?'});
    if (!users[username])
        return res.status(403).json({usernameError: 'Такого пользователя нет'});
    if ((isAdmin !== 'true') && (isAdmin !== 'false'))
        return res.status(403).json({adminError: 'Недопустимое значение'});

    users[username].isAdmin = (isAdmin === 'true');
    res.status(200).end();
});

app.post('/api/admin/delete-user', (req, res) => {
    const id = req.cookies['userId'];
    if (!(id in usernames))
        return res.status(403).json({usernameError: 'Сессия устарела, и ты теперь не вошёл в аккаунт.'});
    if (!users[usernames[id]].admin)
        return res.status(403).json({usernameError: 'Вы не админ. Таким сюда низя'});

    const username = req.body.username;
    if (!username)
        return res.status(403).json({usernameError: 'Тебе не кажется, что чего-то не хватает?'});
    if (!users[username])
        return res.status(403).json({usernameError: 'Такого пользователя нет'});

    delete users[username];
    res.status(200).end();
});


app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});

/*const httpsOptions = {
    key: fs.readFileSync("server.key"), // путь к ключу
    cert: fs.readFileSync("server.crt") // путь к сертификату
}*/

//http.createServer(app).listen(8000);