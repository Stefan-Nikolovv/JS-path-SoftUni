import {html} from "../node_modules/lit-html/lit-html.js";

import * as api from  '../api.js';

const detailTemplate = (res,isOwner,logged ,ctx) => html`
${logged ?
html `
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${res.imageUrl} alt="example1" />
            <p id="details-title">${res.title}</p>
            <p id="details-category">
              Category: <span id="categories">${res.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${res.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >${res.description}</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${res.requirements}</span
                >
              </div>
            </div>
            
            
            ${isOwner ? html` 
            <p>Applications: <strong id="applications">${ctx.numOfApply}</strong></p>
            <div id="action-buttons">
              <a href="${res._id}/edit" id="edit-btn">Edit</a>
              <a href="${res._id}/delete" id="delete-btn">Delete</a>
              </div>` : 
              html`<div id="action-buttons">
                  <p>Applications: <strong id="applications">${ctx.numOfApply}</strong></p>
                  ${ctx.AllAplly > 0 ? html``:
                  html`<a @click=${e => onApply(e, ctx)} id="apply-btn">Apply</a>` 
                }
                  
                  </div>
              `} 
              
            </div>
          </div>
        </section>

`:
html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src=${res.imageUrl} alt="example1" />
            <p id="details-title">${res.title}</p>
            <p id="details-category">
              Category: <span id="categories">${res.category}</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">${res.salary}</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>${res.description}</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >${res.requirements}</span
                >
              </div>
             
            </div>
            <p>Applications: <strong id="applications">${ctx.numOfApply}</strong></p>
          </div>
        </section>

`
}

`

export const detailsHandler = ( ctx ) =>{
api.getOneItem(ctx.params.postId).then(async(res) => {
  ctx.numOfApply = await api.allApply(ctx.params.postId);
  
  let isOwner = false;
  let logged = false;
  if(ctx.user != undefined){
    logged = true;
    
  }
    if(ctx.user != undefined){
      ctx.AllAplly =  await api.getOfferCount(ctx.params.postId,ctx.user._id);
      
    if(ctx.user._id == res._ownerId){
        isOwner = true;
    }
    }
    ctx.render(detailTemplate(res,isOwner,logged,ctx))})
}

async function onApply(e,ctx) {
  e.preventDefault();
 
    api.apply(ctx.params.postId).then(() => ctx.page.redirect(`/details/${ctx.params.postId}`))
}


