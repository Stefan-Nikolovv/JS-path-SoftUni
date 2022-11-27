import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";

const editTemplate = (post,onSubmit) => html`

<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit = ${onSubmit} class="edit-form" >
            <input type="text" name="brand" .value = ${post.brand} id="shoe-brand" placeholder="Brand" />
            <input type="text" name="model" .value = ${post.model} id="shoe-model" placeholder="Model" />
            <input type="text" name="imageUrl" .value = ${post.imageUrl} id="shoe-img" placeholder="Image url" />
            <input type="text" name="release" .value = ${post.release} id="shoe-release" placeholder="Release date" />
            <input type="text" name="designer" .value = ${post.designer} id="shoe-designer" placeholder="Designer" />
            <input type="text" name="value" .value = ${post.value} id="shoe-value" placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`
export const editView = (ctx) => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
  const shoe = {
    brand: formData.get('brand').trim(),
    model: formData.get('model').trim(),
    imageUrl: formData.get('imageUrl').trim(),
    release: formData.get('release').trim(),
    designer: formData.get('designer').trim(),
    value: formData.get('value').trim(),
  }
        let {
            brand,
            model,
            imageUrl,
            release,
            designer,
            value
        } = {...shoe};
        

        if(brand == "" || model == "" || imageUrl == "" || release == "" || designer == "" || value == ""){
            return alert('Invalid info');
          }
        api.editItem(ctx.params.postId, brand,
            model,
            imageUrl,
            release,
            designer,
            value)
            .then(() => ctx.page.redirect(`/shoes/${ctx.params.postId}`))
            
    }
    api.getOneItem(ctx.params.postId)
    .then(post => {
        ctx.render(editTemplate(post,onSubmit));
    });
    

}