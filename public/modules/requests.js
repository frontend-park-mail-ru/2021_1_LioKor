export async function request(method, url, data = {}) {
    let params = {};
    if (!['GET', 'HEAD'].includes(method) && data) {
        params = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    }

    return await fetch(url, {
        method: method,
        credentials: 'include',
        ...params
    });
}
