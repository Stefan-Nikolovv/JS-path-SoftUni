import * as request from "../src/request.js";
import * as data from '../authService/data.js'
const baseUrl = 'http://localhost:3030/users';
const dataUrl = 'http://localhost:3030/data';

export const login = (email,password) => 
    request.post(`${baseUrl}/login`,{email,password}).then(user =>{
        data.savedUser(user);
       return user;
    });


export const register = (email,password) => request.post(`${baseUrl}/register`, {email,password}).then(result => {
    localStorage.setItem('user', JSON.stringify(result));
    return result;
});

export const logout =()=> fetch(`${baseUrl}/logout`, {
    headers: { "X-Authorization": data.getToken() }})
    .then(() =>{
        data.deleteUser();
    });

export async function dashboard (){return fetch(`${dataUrl}/pets?sortBy=_createdOn%20desc&distinct=name`)}
