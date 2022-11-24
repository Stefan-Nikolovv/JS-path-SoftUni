import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../api.js";
const loginTemplate = (onSubmit) => html`
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${onSubmit}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>
`;
export const loginHandler = (ctx) => {
  const onSubmit = (e) => {
    e.preventDefault();
    let { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    if (email !== "" && password !== "") {
      api
        .login(email, password)
        .then((res) => {
          ctx.page.redirect("/dashboard");
        })
        .catch((ex) => {
          alert(`Login or password don't match`);
        });
    }
  };
  ctx.render(loginTemplate(onSubmit));
};
