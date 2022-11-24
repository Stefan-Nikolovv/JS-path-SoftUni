import {html,render} from '../node_modules/lit-html/lit-html.js';
import {login} from '../service/authServices.js'
const loginTemplate = (loginHandler) => html `
 <form id="login" @submit ="${loginHandler}">
                <h1 class="title">Login</h1>

                <article class="input-group">
                    <label for="login-email">Email: </label>
                    <input type="email" id="login-email" name="email">
                </article>

                <article class="input-group">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password">
                </article>

                <input type="submit" class="btn submit-btn" value="Log In">
            </form>
`;

export const loginView = (ctx) =>{
    const loginHandler = (e) =>{
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        let {email, password} = Object.fromEntries(data);
        login(email, password).then(() => ctx.page.redirect('/'));
    }
    ctx.render(loginTemplate(loginHandler))
    
};
