import { html } from "../node_modules/lit-html/lit-html.js";

const navigationTemplate = () => html`
  <nav>
    <section class="logo">
      <img src="./images/logo.png" alt="logo" />
    </section>
    <ul>
      <!--Users and Guest-->
      <li><a href="/home">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <!--Only Guest-->
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
      <!--Only Users-->
      <li><a href="/create">Create Postcard</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
`;

export const navigationHandler = (ctx) => {
    return navigationTemplate(ctx);
}