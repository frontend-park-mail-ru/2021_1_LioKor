/**
 * Returns value of a cookie by its name
 *
 * @param {string} name name of a cookie
 * @returns {string} value of a cookie
 */
export function getCookie(name: string): string {
    console.log(name);
    const matches = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    if (matches && matches.length > 0) {
        return matches.pop() as string;
    } else {
        return '';
    }
}
