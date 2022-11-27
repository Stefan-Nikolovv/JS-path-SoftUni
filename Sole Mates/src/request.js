import {getToken} from '../src/api.js';

 const request = (method, url, data) => {
    let opitions = {};

    if(method != "GET"){
        opitions.method = method;
        if(getToken()){
            opitions.headers = {
                'content-type' : 'application/json',
                'X-Authorization': getToken()
            };
        }else{
            opitions.headers = {
                'content-type' : 'application/json',
            };
        }
      
        opitions.body = JSON.stringify(data);
    }
    return fetch(url, opitions).then(res => res.json());
    
}
export const get = request.bind({},'GET');
export const post = request.bind({},'POST');
export const del = request.bind({},'DELETE');
export const put = request.bind({},'PUT');
// if (res.ok) {
//     return res.json();
//   }