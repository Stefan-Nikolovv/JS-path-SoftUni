import * as request from '../service/request.js'

const baseUrl = 'http://localhost:3030/users';
const savedUser = (user) =>{
    if(user.accessToken){
        localStorage.setItem('user', JSON.stringify(user));
    }
}
export const login = (email, password) =>{
   return request.post(`${baseUrl}/login`, {email, password}).then(user =>{
    savedUser(user);
    return user;
   })
}
