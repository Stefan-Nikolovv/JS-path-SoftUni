import { html } from "../node_modules/lit-html/lit-html.js";
import { getUser } from "../api.js";
const navigationTemplate = (user) => html`
  <a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>

  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
    </div>

    ${user
      ? html`<div class="user">
          <a href="/create">Create Offer</a>
          <a href="/logout">Logout</a>
        </div>`
      : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>
`;

export const navigationHandler = (ctx) => {
  let user = getUser()
  return navigationTemplate(!!user);
};
