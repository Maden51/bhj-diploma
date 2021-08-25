/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const func = function () {},
    {
        method = 'GET',
        callback = func,
        responseType = 'json',
        data = {}
    } = options;


    const xhr = new XMLHttpRequest();
    const url = options.url;
    const formData = new FormData();

    if (options.method === 'GET') {
        for (let key in options.data) {
            url += '?' + `${key}=${options.data[key]}`;
        }
    } else {
        for (let key in options.data) {
        formData.append(key, options.data[key]);
        }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch(err) {
        callback(err);
    }

    xhr.addEventListener('load', () => {
        if (xhr.readyState === 4 & xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            options.callback(null, response);
        }
    })
};
