import * as api from "../src/api.js";


export const savedUser =(user) => {
 if(user.accessToken){
    localStorage.setItem('user',JSON.stringify(user));
 }
}

export const getUser = () => {
    let serilaizedUser = localStorage.getItem('user');
    if(serilaizedUser){
        let user = JSON.parse(serilaizedUser);
        return user;
    }
}
export const getToken = () => (getUser() ? getUser().accessToken : undefined);

export const deleteUser = () => {
    localStorage.removeItem("user");
  };