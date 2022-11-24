import {html} from '../node_modules/lit-html/lit-html.js';
const user = html` <div id="user">
<a href="/">My Posts</a>
<a href="/create">Create Post</a>
<a href="/logout">Logout</a>
</div>`;
const notUser = html`<div id="guest">
<a href="/login">Login</a>
<a href="/register">Register</a>
</div>`;
const navigationTemplate = (isLogged) => html `
  <h1><a href="/">Orphelp</a></h1>

<nav>
    <a href="/">Dashboard</a>
     ${isLogged ?
      user
    :
     notUser
     }
    
</nav>
`;
export const navigationView = (ctx) => {
    
    return navigationTemplate(!!ctx.user);
}
