import * as request from "./request.js"
import * as data from "../autService/data.js";

const baseUrl = 'http://localhost:3030/users';
const dataUrl = 'http://localhost:3030/data';


export const login = (email,password) => request.post(`${baseUrl}/login`, {email,password})
        .then(user =>{
            data.savedUser(user);
            return user;
        });

export const register =(email,password) => request.post(`${baseUrl}/register`,{email,password})
.then(result => {
    localStorage.setItem("user", JSON.stringify(result));
});

export const logout =()=> fetch(`${baseUrl}/logout`,{
    headers: { "X-Authorization": data.getToken() }})
    .then(() =>{
        data.deleteUser();
    });

export const dashboard =()=> {return request.get(`${dataUrl}/albums?sortBy=_createdOn%20desc`)};

export const create =(singer,album,imageUrl,release,label,sales)=> request.post(`${dataUrl}/albums`, {singer,album,imageUrl,release,label,sales});

export const getItem =(postId) => request.get(`${dataUrl}/albums/${postId}`);

export const edit =(postId,singer,album,imageUrl,release,label,sales) => request.put(`${dataUrl}/albums/${postId}`,{singer,album,imageUrl,release,label,sales})

export const del =(postId)=> request.del(`${dataUrl}/albums/${postId}`).then((res) => new Date(res));

export const like =(albumId)=> request.post(`${dataUrl}/likes`,{albumId});
export const allLikes  = (albumId) => request.get(`${dataUrl}/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
export const userApplies = (albumId,userId) => request.get(`${dataUrl}/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`);