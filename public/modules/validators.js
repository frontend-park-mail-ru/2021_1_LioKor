export function validatePassword(password) {
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return password.match(validPasswordRegex) !== null;
}

export function validateEmail(email) {
    const validEmailRegex = /^[^@ ]{1,}@[^@ ]{3,}\..{2,}$/;
    return email.match(validEmailRegex) !== null;
}

export function validateFullname(fullname) {
    return fullname.length < 128;
}
