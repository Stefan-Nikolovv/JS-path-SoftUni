import {html} from "../node_modules/lit-html/lit-html.js"

import * as api from "../src/api.js"

const loginTemplate = (onSubmit) => html `
<section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit = ${onSubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`;


export const loginHandler = (ctx) => {
    const onSubmit =(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let email = data.get('email').trim();
        let password = data.get('password').trim();
        if(email == "" || password == ""){
            window.alert(`All fileds are required!`);
        }else{
            api.login(email,password).then(() => ctx.page.redirect("/dashboard"))
        }
    }
    ctx.render(loginTemplate(onSubmit));
}