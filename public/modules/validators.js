/**
 * @param {string} password password to be checked
 * @returns {boolean} true if valid, else false
 */
export function validatePassword(password) {
    const validPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return password.match(validPasswordRegex) !== null;
}

/**
 * @param {string} email email to be checked
 * @returns {boolean} true if valid, else false
 */
export function validateEmail(email) {
    const validEmailRegex = /^[^@ ]{1,}@[^@ ]{3,}\..{2,}$/;
    return email.match(validEmailRegex) !== null;
}

/**
 * @param {string} fullname fullname to be checked
 * @returns {boolean} true if valid, else false
 */
export function validateFullname(fullname) {
    return fullname.length < 128;
}
