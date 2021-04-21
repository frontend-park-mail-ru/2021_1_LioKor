/**
 * Returns value of a cookie by its name
 *
 * @param {string} name name of a cookie
 * @returns {string} value of a cookie
 */
export function getCookie(name: string): string {
    let csrfToken = '';

    document.cookie.split(';').every((v) => {
        const [key, ...value] = v.trim().split('=');

        if (key === name) {
            csrfToken = value.join('=');
            return false;
        }
        return true;
    })

    return csrfToken;
}
