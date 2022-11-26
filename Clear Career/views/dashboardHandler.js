 import {html} from '../node_modules/lit-html/lit-html.js';
import * as api from '../api.js'


const postTemplate = (offer) => html`
  <div class="offer">
            <img src= ${offer.imageUrl} alt="example1" />
            <p>
              <strong>Title: </strong><span class="title">${offer.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
            
            <a class="details-btn" href="/details/${offer._id}">Details</a>
          </div>
          <!-- <div class="offer">
            <img src="./images/example2.png" alt="example2" />
            <p>
              <strong>Title: </strong
              ><span class="title">Senior Frontend Software Engineer</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">7000</span></p>
            <a class="details-btn" href="">Details</a>
          </div>
          <div class="offer">
            <img src="./images/example3.png" alt="./images/example3.png" />
            <p>
              <strong>Title: </strong
              ><span class="title">Invoice Administrator</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">1700</span></p>
            <a class="details-btn" href="">Details</a>
          </div> -->
`
 const dashboardTemplate = (offers) => html `
 <section id="dashboard">
          <h2>Job Offers</h2>
          <ul class="card-wrapper">
        ${offers.length === 0 ?
        html`<h2>No offers yet.</h2>` :
        offers.map(postTemplate)
        };
        </ul>
        </section>
 `
 ;

 export async function dashboardHandler (ctx){
  const offers  = await api.dashboardView();
    ctx.render(dashboardTemplate(offers))
 }


