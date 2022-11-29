import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";

const postTemplate = (offer)=> html`
<div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src=${offer.image}>
                    </article>
                    <h2 class="name">${offer.name}</h2>
                    <h3 class="breed">${offer.breed}</h3>
                    <div class="action">
                        <a class="btn" href="/details/${offer._id}">Details</a>
                    </div>
                </div>
`

const dashboardTemplate = (offers) => html`
<section id="dashboard">
            <h2 class="dashboard-title">Services for every animal</h2>
            <div class="animals-dashboard">
${
  offers.length === 0 ? html` <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>` : offers.map(postTemplate)
}


                <!-- <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src="./images/dog2.jpg">
                    </article>
                    <h2 class="name">Apollo</h2>
                    <h3 class="breed">Pug</h3>
                    <div class="action">
                        <a class="btn" href="#">Details</a>
                    </div>
                </div>

                <div class="animals-board">
                    <img class="animal-image-cover" src="./images/guinea-pig.jpg">
                    <h2 class="name">Chibi</h2>
                    <h3 class="breed">Teddy guinea pig</h3>
                    <div class="action">
                    <h2 class="name">Max</h2>
                    <h3 class="breed">Shiba Inu</h3>
                    <div class="action">
                        <a class="btn" href="#">Details</a>
                    </div>
                </div>       <a class="btn" href="#">Details</a>
                    </div>
                </div>

                <div class="animals-board">
                    <article class="service-img">
                        <img class="animal-image-cover" src="./images/Shiba-Inu.png">
                    </article> -->
                 
                <!--If there is no pets in dashboard-->
               
            </div>
        </section>
`;

export const dashBoardHandler = (ctx) => {
    api.dashboard()
    .then(offers =>{
        
        ctx.render(dashboardTemplate(offers));
    })
  
}
