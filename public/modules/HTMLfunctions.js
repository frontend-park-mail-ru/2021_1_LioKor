function logout() {
    document.cookie = 'userId=-1; max-age=-1';
    document.getElementById("nickname").innerText = "Войти";
    document.getElementById("me/login-button").setAttribute('href', '/login');
}