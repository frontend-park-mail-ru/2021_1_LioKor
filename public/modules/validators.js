export function validatePassword(password) {
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return password.match(validPasswordRegex) !== null;
}
