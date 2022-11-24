
export const request = (method,url, data) => {
    let opitons = {};
    if(method != 'GET'){
        opitons.method = method;
        opitons.headers = {
            'content-type': 'application/json'
        }
        opitons.body = JSON.stringify(data);
    }
    return fetch(url,opitons).then(res => res.json());
}
export const get = request.bind({},"GET");
export const post = request.bind({},"POST")
export const del = request.bind({},"DELETE")
export const put = request.bind({},"PUT")