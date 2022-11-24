import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../api.js";

const createTemplate = (onSubmit) => html`
  <section id="create">
    <div class="form">
      <h2>Create Offer</h2>
      <form class="create-form" @submit=${onSubmit}>
        <input type="text" name="title" id="job-title" placeholder="Title" />
        <input
          type="text"
          name="imageUrl"
          id="job-logo"
          placeholder="Company logo url"
        />
        <input
          type="text"
          name="category"
          id="job-category"
          placeholder="Category"
        />
        <textarea
          id="job-description"
          name="description"
          placeholder="Description"
          rows="4"
          cols="50"
        ></textarea>
        <textarea
          id="job-requirements"
          name="requirements"
          placeholder="Requirements"
          rows="4"
          cols="50"
        ></textarea>
        <input type="text" name="salary" id="job-salary" placeholder="Salary" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export const createOfferHandler = (ctx) => {
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
        alert(`All fields should be filled.`);
    }else{
        api.create(title,imageUrl,category,description,requirements,salary).then(() => ctx.page.redirect('/dashboard'));
    }
   
  };
  ctx.render(createTemplate(onSubmit));
};
