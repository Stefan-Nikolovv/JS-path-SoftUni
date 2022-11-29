import { html, nothing } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js"
const detailsTemplate = (offer, logged, isOwner, ctx,result) => html`
${logged ? html`<section id="detailsPage">
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
                <h4 class="donation">Donation: ${result}$</h4>
            </div>

            ${isOwner ? html` <div class="actionBtn">

                <a href="${offer._id}/edit" class="edit">Edit</a>
                <a href="${offer._id}/remove" class="remove">Delete</a>

            </div>` : html`<div class="actionBtn">
                ${ctx.zeroOrOne > 0 ? html`` :
                 html`<a @click=${e=> onApply(e, ctx)} class="donate">Donate</a> `
            }
                
            </div>`}

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



        </div>
    </div>
</section>
`
}
`
export const detailsHandler = (ctx) => {
    api.getItem(ctx.params.postId)
        .then(async (offer) => {
            let result = 0;
           
            ctx.totalApplies = await api.allApply(ctx.params.postId); // this is 1 and the result visible result shpuld be 100$
            if(ctx.totalApplies){
                result = Number(ctx.totalApplies) * 100;                
            }
            let logged = false;
            let isOwner = false;
            if (ctx.user != undefined) {
                logged = true;
                
                ctx.zeroOrOne = await api.userApplies(ctx.params.postId, ctx.user._id);

                if (ctx.user._id == offer._ownerId) {
                    isOwner = true;
                }

            }
            ctx.render(detailsTemplate(offer, logged, isOwner, ctx,result))
        })
};

export const onApply = (e, ctx) => {
    e.preventDefault();
    api.apply(ctx.params.postId).then(() => ctx.page.redirect(`/details/${ctx.params.postId}`))
}