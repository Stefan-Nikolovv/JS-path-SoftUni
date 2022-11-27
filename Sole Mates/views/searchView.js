import {html, nothing} from '../node_modules/lit-html/lit-html.js';

import * as api from "../src/api.js";

const postTemplate = (post,user) => html`
<div id="search-container">
            <ul class="card-wrapper">
              <li class="card">
                <img src="${post.imageUrl}" alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${post.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${post.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${post.value}</span>$</p>
                ${user ? html`
                <a class="details-btn" href="shoes/${post._id}">Details</a>
                `:
                  nothing
              }
                
              </li>
            </ul>
`

const searchTemplate = (searchHandler, posts,user) =>html`
<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf" @submit = ${searchHandler} >
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

        
          ${posts.length > 0 ?
          posts.map(x => postTemplate(x,user))
          :
          html`<h2>There are no results found.</h2>`
          }
            
          </div>
        </section>
`

export const  serachView = (ctx) => {

  const searchHandler = (e) => {
    e.preventDefault();
    let searchElement = document.getElementById("#search-input");
    api.search(searchElement.value)
    .then(posts =>  {
      ctx.render(searchTemplate(searchHandler,posts,ctx.user))})
  }
  ctx.render(searchTemplate(searchHandler,[]))
}