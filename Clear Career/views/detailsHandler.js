import {html} from "../node_modules/lit-html/lit-html.js";

import * as api from  '../api.js';

const detailTemplate = (res,isOwner,logged ,ctx) => html`
${logged ?
html `
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${res.imageUrl}" alt="example1" />
            <p id="details-title">"${res.title}"</p>
            <p id="details-category">
              Category: <span id="categories">"${res.category}"</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">"${res.salary}"</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span
                  >"${res.description}"</span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >"${res.requirements}"</span
                >
              </div>
            </div>
            

            ${isOwner ? html` <div id="action-buttons">
              <a href="${res._id}/edit" id="edit-btn">Edit</a>
              <a href="${res._id}/delete" id="delete-btn">Delete</a>
              </div>` : 
              html`<p>Applications: <strong id="applications">1</strong></p>
                  <a @click=${e => onApply(e, ctx)} id="apply-btn">Apply</a>
              `} 
              
            </div>
          </div>
        </section>

`:
html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${res.imageUrl}" alt="example1" />
            <p id="details-title">"${res.title}"</p>
            <p id="details-category">
              Category: <span id="categories">"${res.category}"</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">"${res.salary}"</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span>"${res.description}"</span>
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >"${res.requirements}"</span
                >
              </div>
             
            </div>
            <p>Applications: <strong id="applications">1</strong></p>
          </div>
        </section>

`
}

`

export const detailsHandler = ( ctx ) =>{
api.getOneItem(ctx.params.postId).then(res => {
  let isOwner = false;
  let logged = false;
  if(ctx.user != undefined){
    logged = true;
  }
    if(ctx.user != undefined){
    if(ctx.user._id == res._ownerId){
        isOwner = true;
    }
    }
    ctx.render(detailTemplate(res,isOwner,logged,ctx))})
}

function onApply(e,ctx) {
  e.preventDefault();
  if(e){
    e.target.style.display = 'none';
    api.apply(ctx.params.postId)
  }
  api.allApply(ctx.params.postId).then(() => console.log('all'))
  api.getOfferCount(ctx.params.postId,ctx.user._id).then(res => console.log(res))
}


html`
<!-- Details page -->
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="./images/example2.png" alt="example1" />
            <p id="details-title">Senior Frontend Software Engineer</p>
            <p id="details-category">
              Category: <span id="categories">IT, Developer, WEB</span>
            </p>
            <p id="details-salary">
              Salary: <span id="salary-number">7000</span>
            </p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Description</h4>
                <span></span
                >
              </div>
              <div id="details-requirements">
                <h4>Requirements</h4>
                <span
                  >Degree in computer science or related field. Understanding of
                  key design principles. Proficiency in HTML, CSS, JavaScript.
                  Experience with responsive and adaptive design. Good
                  problem-solving skills. Excellent verbal communication skills.
                  Good interpersonal skills.</span
                >
              </div>
            </div>
            <p>Applications: <strong id="applications">1</strong></p>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              <a href="" id="edit-btn">Edit</a>
              <a href="" id="delete-btn">Delete</a>

              <!--Bonus - Only for logged-in users ( not authors )-->
              <a href="" id="apply-btn">Apply</a>
            </div>
          </div>
        </section>
`