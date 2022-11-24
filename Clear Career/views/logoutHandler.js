import * as api from '../api.js'
export const logoutHandler = (ctx) => {
api.logout()
.then(() => ctx.page.redirect('/dashboard')).catch((ex) => alert("Logged Out!"))
}