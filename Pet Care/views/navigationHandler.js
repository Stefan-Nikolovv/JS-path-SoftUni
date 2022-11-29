import { html } from "../node_modules/lit-html/lit-html.js";

const navigationTemplate = (user) => html`
  <nav>
    <section class="logo">
      <img src="/images/logo.png" alt="logo" />
    </section>
    <ul>
      ${user ? html`<li><a href="/">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/create">Create Postcard</a></li>
      <li><a href="/logout">Logout</a></li>` :
      html `<li><a href="/">Home</a></li>
      <li><a href="/dashboard">Dashboard</a></li>
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>`
       }
      
      <!--Only Guest-->
      
      <!--Only Users-->
      
    </ul>
  </nav>
`;

export const navigationHandler = (ctx) => {
  
    return navigationTemplate(!!ctx.user);
}