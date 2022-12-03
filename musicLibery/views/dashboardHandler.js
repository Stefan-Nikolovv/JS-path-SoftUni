import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";

const postTemplate =(post)=>html` 
 <!-- Display a li with information about every post (if any)-->
 <li class="card">
            <img src=${post.imageUrl} alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${post.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${post.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${post.sales}</span></p>
            <a class="details-btn" href="/details/${post._id}">Details</a>
          </li>
`;

const dashboardTemplate = (posts) => html`
<section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
         ${posts.length === 0 ?
         html`<h2>There are no albums added yet.</h2>`:
         posts.map(postTemplate)
        }
        </ul>

        <!-- Display an h2 if there are no posts -->
        
      </section>
`;

export const dashboardHandler = (ctx) => {
    api.dashboard().then(posts => {
        ctx.render(dashboardTemplate(posts));
    })
}