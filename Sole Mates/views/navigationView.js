import{ html } from '../node_modules/lit-html/lit-html.js';

const navigationTemplate = (user) => html `
<a id="logo" href="/"><img id="logo-img" src="/images/logo.png" alt="/">
        <nav>
          <div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
          </div>

          ${user ? html`
          <div class="user">
            <a href="/create">Add Pair</a>
            <a href="/logout">Logout</a>
          </div>` : 
          html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`
          }
        
        </nav>
        </a>
`;

export const navigationVIew = (ctx) => {
    return navigationTemplate(!!ctx.user)
}