import { html,nothing } from "../node_modules/lit-html/lit-html.js";
import * as api from '../api.js';

const detailsTemplate = (post, isOwner) => html`
  
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src="${post.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${post.brand}</span></p>
            <p>
                Model: <span id="details-model">${post.model}</span>
            </p>
            <p>Release date: <span id="details-release">${post.release}</span></p>
            <p>Designer: <span id="details-designer">${post.designer}</span></p>
            <p>Value: <span id="details-value">${post.value}</span></p>
        </div>
            ${isOwner ? html `
            <div id="action-buttons">
            <a href="/shoes/${post._id}/edit" id="edit-btn">Edit</a>
            <a href="/shoes/${post._id}/delete" id="delete-btn">Delete</a>
            </div> 
        `: html`` }
        
    </div>
</section>
 `;

 export const detailView = (ctx) => {
    api.getOneItem(ctx.params.postId)
.then(post => 
    {
        let isOwner = false;
        if(ctx.user != undefined){
        if(ctx.user._id == post._ownerId){
            isOwner = true;
        }
        }
        ctx.render(detailsTemplate(post,isOwner))
    });
    
 }