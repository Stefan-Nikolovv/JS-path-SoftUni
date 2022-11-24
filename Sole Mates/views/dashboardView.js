import { html } from "../node_modules/lit-html/lit-html.js";

import * as api from "../api.js";
const postTemplate = (page) => html`
<li class="card">
  <img src="${page.imageUrl}" alt="travis" />
  <p>
    <strong>Brand: </strong><span class="brand">${page.brand}</span>
  </p>
  <p>
    <strong>Model: </strong><span class="model">${page.model}</span>
  </p>
  <p>
    <strong>Value:</strong><span class="value">${page.value}</span>$</p>
  <a class="details-btn" href="shoes/${page._id}">Details</a>
</li> `;

const dashboardTemplate = (pages) => html`
  <section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
    ${pages.length > 0
      ? html`${pages.map((post) => postTemplate(post))}`
      : 
      html` <h2>There are no items added yet.</h2> ` }
     </ul>
  </section>
`;

export const dashboardView = (ctx) => {
  api.dashboard().then(pages => {

    ctx.render(dashboardTemplate(pages, ctx.user));

  });
};
