import * as api from "../src/api.js";

export const logoutHandler = (ctx) =>{
    api.logout()
    .then(() => ctx.page.redirect('/home'));
}