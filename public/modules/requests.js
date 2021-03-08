export function request(method, url, data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            let response = {};
            try {
                response = JSON.parse(xhr.responseText);
            } catch {
                console.warn('Unable to parse response!');
            }

            resolve({
                status: xhr.status,
                response: response
            });
        });

        if (data) {
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}
