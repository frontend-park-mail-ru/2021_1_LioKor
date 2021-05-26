import { getCookie } from './utils';

/**
 * Sends http request with JSON data to a specified url
 *
 * @param {string} method method to use: GET/POST/PUT/DELETE
 * @param {string} url url to which the request will be sent
 * @param {object} data post/put/delete dict, that will be JSONed
 * @returns {Promise<object>} returns fetch's response
 */
export async function request(method: string, url: string, data = {}): Promise<Record<symbol, unknown>> {
    let params = {};
    if (!['GET', 'HEAD'].includes(method) && data) {
        params = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCookie('_csrf')
            },
            body: JSON.stringify(data)
        };
    }

    return fetch(url, {
        method: method,
        mode: 'cors',
        credentials: 'include',
        ...params
    });
}
