const VALID_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
const VALID_EMAIL_REGEX = /^[^@ ]{1,}@[^@ ]{2,}\..{2,}$/;
const MAX_FULLNAME_LENGTH = 128;

/**
 * Validates password, if no args are passed - returns string with requirements
 *
 * @param {string} password password to be checked
 * @returns {(boolean|string)} true if valid, else false. If no password passed returns string with description
 */
export function validatePassword(password: string | null = null): boolean | string {
    if (password === null) {
        return 'Минимум 6 символов, хотя бы 1 буква и 1 цифра';
    }
    return password.match(VALID_PASSWORD_REGEX) !== null;
}

/**
 * @param {string} email email to be checked
 * @returns {boolean} true if valid, else false
 */
export function validateEmail(email: string): boolean {
    return email.match(VALID_EMAIL_REGEX) !== null;
}

/**
 * @param {string} fullname fullname to be checked
 * @returns {boolean} true if valid, else false
 */
export function validateFullname(fullname: string): boolean {
    return fullname.length <= MAX_FULLNAME_LENGTH;
}
