import * as api from '../api.js'

export const logoutView = (ctx) => {
    
    api.logout().then(() => {ctx.page.redirect('/dashboard')});
}