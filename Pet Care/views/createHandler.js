import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";
const createTemplate = (onSubmit) => html`
  <section id="createPage">
    <form class="createForm" @submit = ${onSubmit}>
      <img src="./images/cat-create.jpg" />
      <div>
        <h2>Create PetPal</h2>
        <div class="name">
          <label for="name">Name:</label>
          <input name="name" id="name" type="text" placeholder="Max" />
        </div>
        <div class="breed">
          <label for="breed">Breed:</label>
          <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
        </div>
        <div class="Age">
          <label for="age">Age:</label>
          <input name="age" id="age" type="text" placeholder="2 years" />
        </div>
        <div class="weight">
          <label for="weight">Weight:</label>
          <input name="weight" id="weight" type="text" placeholder="5kg" />
        </div>
        <div class="image">
          <label for="image">Image:</label>
          <input
            name="image"
            id="image"
            type="text"
            placeholder="./image/dog.jpeg"
          />
        </div>
        <button class="btn" type="submit">Create Pet</button>
      </div>
    </form>
  </section>
`;

export const createHandler = (ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let name = data.get("name").trim();
        let breed = data.get("breed").trim();
        let age = data.get("age").trim();
        let weight = data.get("weight").trim();
        let image = data.get("image").trim();
        if(name == "" || breed == "" || age == "" || weight == "" || image == ""){
            alert(`All fields should be filled.`);
        }else{
            api.create(name,breed,age,weight,image).then(() => ctx.page.redirect('/'));
        }

    }
    ctx.render(createTemplate(onSubmit));
}
