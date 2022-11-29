import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js"

const editTemplate = (onSubmit,post) => html`
  <section id="editPage">
    <form class="editForm" @submit=${onSubmit}>
      <img src=/images/${post.image} />
      <div>
        <h2>Edit PetPal</h2>
        <div class="name">
          <label for="name">Name:</label>
          <input name="name" id="name" type="text" value=${post.name} />
        </div>
        <div class="breed">
          <label for="breed">Breed:</label>
          <input name="breed" id="breed" type="text" value=${post.breed} />
        </div>
        <div class="Age">
          <label for="age">Age:</label>
          <input name="age" id="age" type="text" value=${post.age} />
        </div>
        <div class="weight">
          <label for="weight">Weight:</label>
          <input name="weight" id="weight" type="text" value=${post.weight} />
        </div>
        <div class="image">
          <label for="image">Image:</label>
          <input name="image" id="image" type="text" value=${post.image} />
        </div>
        <button class="btn" type="submit">Edit Pet</button>
      </div>
    </form>
  </section>
`;

export const editHandler =(ctx) => {
    const onSubmit =(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let name = data.get("name").trim();
        let breed = data.get("breed").trim();
        let age = data.get("age").trim();
        let weight = data.get("weight").trim();
        let image = data.get("image").trim();
        if(name == "" || breed == "" || age == "" || weight == "" || image == "" ){
            window.alert(`All fields should be filled.`);
        }else{
            api.edit(ctx.params.postId,name,breed,age,weight,image).then(() => ctx.page.redirect(`/details/${ctx.params.postId}`)) ;
        }
    }
    api.getItem(ctx.params.postId).then(post => ctx.render(editTemplate(onSubmit,post)))
}