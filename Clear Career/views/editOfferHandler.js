 import { html } from "../node_modules/lit-html/lit-html.js";

 import * as api from "../api.js"

 const editTemplate = (onSubmit,post) => html `
  <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit = ${onSubmit}>
              <input
                type="text"
                name="title"
                value = ${post.title}
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                value = ${post.imageUrl}
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                value = ${post.category}
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                .value = ${post.description}
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                .value = ${post.requirements}
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                value = ${post.salary}
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
 `;

 export const editOfferHandler = (ctx) => {
    const onSubmit = (e) => {
     e.preventDefault();
    let data = new FormData(e.currentTarget);
    let title = data.get("title").trim();
    let imageUrl = data.get("imageUrl").trim();
    let category = data.get("category").trim();
    let description = data.get("description").trim();
    let requirements = data.get("requirements").trim();
    let salary = data.get("salary").trim();

    if(title == "" || imageUrl == "" || category == "" || description == "" || requirements == "" || salary == ""){
        window.alert(`All fields should be filled.`);
    }else{
        api.edit(ctx.params.postId,title,imageUrl,category,description,requirements,salary).then(() => ctx.page.redirect(`/offers/${ctx.params.postId}`)) ;
    }

    }
    api.getOneItem(ctx.params.postId).then(post => ctx.render(editTemplate(onSubmit,post)))
    
 }