import * as api from "../src/api.js";

export const logoutView = (ctx) => {
    
    api.logout().then(() => {ctx.page.redirect('/dashboard')});
}