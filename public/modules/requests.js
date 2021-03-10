/**
 * Sends http request with JSON data to a specified url
 *
 * @param {string} method method to use: GET/POST/PUT/DELETE
 * @param {string} url url to which the request will be sent
 * @param {object} data post/put/delete dict, that will be JSONed
 * @returns {object} returns fetch's response
 */
export function request(method, url, data = {}) {
    let params = {};
    if (!['GET', 'HEAD'].includes(method) && data) {
        params = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    }

    return fetch(url, {
        method: method,
        credentials: 'include',
        ...params
    });
}
