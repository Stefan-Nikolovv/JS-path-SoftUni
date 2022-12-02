import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js"
const registerTemplate = (onSubmit) => html`
  <section id="register-page" class="content auth">
    <form id="register" @submit = ${onSubmit}>
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="maria@email.com"
        />

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password" />

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" />

        <input class="btn submit" type="submit" value="Register" />

        <p class="field">
          <span>If you already have profile click <a href="/login">here</a></span>
        </p>
      </div>
    </form>
  </section>
`;


export const registerHandler = (ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let email = data.get('email').trim()
        let password = data.get('password').trim();
        let repass = data.get('confirm-password').trim();
        if(email == "" || password == "" || repass == ""){
            window.alert("All Fields are required!");
        }else{
            if(password != repass){
                window.alert("Passwords did not match!");
            }else{
                api.register(email,password)
                .then(() => ctx.page.redirect("/"))
            }
        }
    }
    ctx.render(registerTemplate(onSubmit))
}