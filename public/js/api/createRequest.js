/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        

        if (options.method === 'GET') {
            let url = options.url;
            url += '?';
            for (let key in options.data) {
                url += `${key}=${options.data[key]}`;
            }

            xhr.open(options.method, url)
            xhr.send();
        } else {
            let formData = new FormData();
            for (let key in options.data) {
                formData.append(key, options.data[key]);
            }
            xhr.open(options.method, options.url);
            xhr.send(formData);
        }

            xhr.addEventListener('load', function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    options.callback(null, xhr.response)
                }
            });

    } catch(err) {
        options.callback(err, null);
    }
};
