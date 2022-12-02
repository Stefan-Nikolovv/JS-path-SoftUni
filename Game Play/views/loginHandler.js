import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";
const loginTemplate = (onSubmit) => html`
  <section id="login-page" class="auth">
    <form id="login" @submit = ${onSubmit}>
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Sokka@gmail.com"
        />

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password" />
        <input type="submit" class="btn submit" value="Login" />
        <p class="field">
          <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
      </div>
    </form>
  </section>
`;

export const loginHandler = (ctx)=> {
    const onSubmit =(e)=> {
        e.preventDefault();
        const data = new FormData(e.target);
        let email = data.get("email").trim();
        let password = data.get("password").trim();
        if(email == "" || password == ""){
            window.alert("All Fields are required!");
        }else{
            api.login(email,password)
            .then(() => ctx.page.redirect('/'))
        }
    }
    console.log('here');
    ctx.render(loginTemplate(onSubmit));
}


