/**
 * Validates password, if no args are passed - returns string with requirements
 *
 * @param {string} password password to be checked
 * @returns {(boolean|string)} true if valid, else false. If no password passed returns string with description
 */
const validPasswordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
export function validatePassword(password: string | null = null): boolean | string {
    if (password === null) {
        return 'Минимум 6 символов, хотя бы 1 буква и 1 цифра';
    }
    return password.match(validPasswordRegex) !== null;
}

/**
 * @param {string} email email to be checked
 * @returns {boolean} true if valid, else false
 */
const validEmailRegex = /^[^@ ]{1,}@[^@ ]{3,}\..{2,}$/;
export function validateEmail(email: string): boolean {
    return email.match(validEmailRegex) !== null;
}

/**
 * @param {string} fullname fullname to be checked
 * @returns {boolean} true if valid, else false
 */
export function validateFullname(fullname: string): boolean {
    return fullname.length < 128;
}
