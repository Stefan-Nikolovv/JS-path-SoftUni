import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from '../api.js'
const registerTemplate = (onSubmit) => html`
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="login-form" @submit = ${onSubmit}>
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>
`;

export const registerView = (ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();
        let result = Object.fromEntries(new FormData(e.currentTarget));
        if(result['email'] == "" || result['password'] == "" || result['re-password'] == ""){
         return alert('All Fields are required!')
        }
        if(result['password'] !== result['re-password']){
          return  alert('password miss match');
        }
        let {email,password,repassword} = result;
        api.register(email,password,repassword)
        .then(() => {ctx.page.redirect('/dashboard')});
    }
    ctx.render(registerTemplate(onSubmit))
}