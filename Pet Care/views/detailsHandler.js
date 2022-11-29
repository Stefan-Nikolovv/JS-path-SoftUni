import { html,nothing } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js"
const detailsTemplate = (offer,logged,isOwner) => html`
  ${logged ? html `<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${offer.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${offer.name}</h1>
                        <h3>Breed: ${offer.breed}</h3>
                        <h4>Age: ${offer.age}</h4>
                        <h4>Weight: ${offer.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                  
                    ${isOwner ? html ` <div class="actionBtn">
                        
                        <a href="${offer._id}/edit" class="edit">Edit</a>
                        <a href="${offer._id}/remove" class="remove">Delete</a>
                      
                    </div>` : nothing}
                
                </div>
            </div>
        </section>`:
        html`
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${offer.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${offer.name}</h1>
                        <h3>Breed: ${offer.breed}</h3>
                        <h4>Age: ${offer.age}</h4>
                        <h4>Weight: ${offer.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                  
                    <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        <a href="#" class="donate">Donate</a>
                    </div>
                </div>
            </div>
        </section>
        `
    }
`
export const detailsHandler = (ctx)=> {
    api.getItem(ctx.params.postId)
    .then(offer => {
        let logged = false;
        let isOwner = false;
        if(ctx.user != undefined){
            logged = true;
            if(ctx.user._id == offer._ownerId){
                isOwner=true;
            }
            
        }
        ctx.render(detailsTemplate(offer,logged,isOwner))
    })
};