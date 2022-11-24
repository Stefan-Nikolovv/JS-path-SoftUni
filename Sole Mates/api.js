import * as request from './src/request.js';

const baseURL = `http://localhost:3030/users`;
const dashboardURL = `http://localhost:3030/data/shoes`;

export const savedUser = (user) => {
    if (user) {
        if (user.accessToken) {
            sessionStorage.setItem('user', JSON.stringify(user));
        };
    } else {
        return;
    }
}
export const getUser = () => {
    let serializaedUser = sessionStorage.getItem('user');
    if (serializaedUser) {
        let user = JSON.parse(serializaedUser);
        return user;
    }
}
const deleteUser = () => {
    sessionStorage.removeItem('user');
}

export const login = (email, password) =>
    request.post(`${baseURL}/login`, { email, password })
        .then(user => {
            savedUser(user);
            return user;
        })

export const register = (email, password) =>
    request.post(`${baseURL}/register`, { email, password })
    .then(user => {
        savedUser(user);
        return user;
    })

export const getToken = () => getUser() ? getUser().accessToken : undefined;

export const logout = () =>
    fetch(`${baseURL}/logout`, { headers: { 'X-Authorization': getToken() } }).then(() => { deleteUser() })

export async function dashboard() {
  return  request.get(`${dashboardURL}/?sortBy=_createdOn%20desc`);
}
    


export const create = (brand, model, imageUrl, release, designer, value) =>
    request.post(dashboardURL, { brand, model, imageUrl, release, designer, value }).then(res => { return res });

export const getOneItem = (postId) => request.get(`${dashboardURL}/${postId}`)

export const editItem = (postId, brand, model, imageUrl, release, designer, value) => request.put(`${dashboardURL}/${postId}`, { brand, model, imageUrl, release, designer, value })

export const removeItem = (postId) => request.del(`${dashboardURL}/${postId}`)

export const search = (searchText) => {

    const query = encodeURIComponent(`brand LIKE "${searchText}"`)
    return request.get(`${dashboardURL}?where=${query}`)
}
