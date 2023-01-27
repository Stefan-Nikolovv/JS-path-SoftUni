import * as request from "./requester";

const baseUrl = 'http://localhost:3030/users';

export const login = (email, password) => 
    request.post(`${baseUrl}/login`, { email, password });


export const registerUser = (email, password) => 
    request.post(`${baseUrl}/register`, { email, password });

export const logoutUser = async (accessToken) => {

    try {
     const response = await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': accessToken
        }
     });

     return response;
    } catch (error) {
       console.log(error); 
    }
    
} 