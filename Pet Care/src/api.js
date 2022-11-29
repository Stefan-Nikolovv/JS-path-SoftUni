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

export const dashboard= () => {return request.get(`${dataUrl}/pets?sortBy=_createdOn%20desc&distinct=name`)};

export const create = (name,breed,age,weight,image) => request.post(`${dataUrl}/pets`,{name,breed,age,weight,image})

export const getItem = (postId) =>  request.get(`${dataUrl}/pets/${postId}`);

export const edit = (postId,name,breed,age,weight,image) => request.put(`${dataUrl}/pets/${postId}`, {name,breed,age,weight,image});

export const del = (postId) => request.del(`${dataUrl}/pets/${postId}`).then(res => new Date(res));

export const apply = (petId) => request.post(`${dataUrl}/donation`,{petId});
export const allApply =(petId) => request.get(`${dataUrl}/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
export const userApplies = (petId,userId) => request.get(`${dataUrl}/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
