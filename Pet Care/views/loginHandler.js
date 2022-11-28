import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";
const loginTemplate = (onSubmit) => html`
  <section id="loginPage">
    <form class="loginForm" @submit=${onSubmit}>
      <img src="./images/logo.png" alt="logo" />
      <h2>Login</h2>

      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="steven@abv.bg"
          value=""
        />
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value=""
        />
      </div>

      <button class="btn" type="submit">Login</button>

      <p class="field">
        <span>If you don't have profile click <a href="/register">here</a></span>
      </p>
    </form>
  </section>
`;

export const loginHandler = (ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email').trim();
        let password = data.get('password').trim();
         if(email == "" || password ==""){
           alert('All Fileds are required!')
         }else{
           api.login(email,password)
           .then(() => ctx.page.redirect('/home'));
         }
   
       }
       ctx.render(loginTemplate(onSubmit));
    }
