import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";

const createTemplate = (onSubmit) => html`
<section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form class="create-form" @submit=${onSubmit}>
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
      <input type="text" name="model" id="shoe-model" placeholder="Model" />
      <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
      <input type="text" name="release" id="shoe-release" placeholder="Release date" />
      <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
      <input type="text" name="value" id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>
`;

export const createView = (ctx) => {
  const onSubmit = (e) => {
    e.preventDefault();
    let { brand, model, imageUrl, release, designer, value
    } = Object.fromEntries(new FormData(e.currentTarget));
    if(brand == "" || model == "" || imageUrl == "" || release == "" || designer == "" || value == ""){
      return alert('All fields are required!');
    }
    api.create(brand,
      model,
      imageUrl,
      release,
      designer,
      value).then(() => ctx.page.redirect('/dashboard'))
  }
  ctx.render(createTemplate(onSubmit))
}


