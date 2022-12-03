import {html} from "../node_modules/lit-html/lit-html.js"

const navigationTemplate = (user) => html`
<!-- Navigation -->
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

<nav>
  <div>
    <a href="/dashboard">Dashboard</a>
  </div>

  ${user ? html`<!-- Logged-in users -->
  <div class="user">
    <a href="/create">Add Album</a>
    <a href="/logout">Logout</a>
  </div> ` :
  html`<!-- Guest users -->
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>`
}
  

  
</nav>
`
export const navigationHandler =(ctx) => {
    return navigationTemplate(!!ctx.user);
}