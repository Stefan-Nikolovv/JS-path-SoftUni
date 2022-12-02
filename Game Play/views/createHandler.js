import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js"
const createTemplate = (onSubmit) => html`
  <section id="create-page" class="auth">
    <form id="create" @submit=${onSubmit}>
      <div class="container">
        <h1>Create Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter game title..."
        />

        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter game category..."
        />

        <label for="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min="1"
          placeholder="1"
        />

        <label for="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder="Upload a photo..."
        />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary"></textarea>
        <input class="btn submit" type="submit" value="Create Game" />
      </div>
    </form>
  </section>
`;

export const createHandler = ( ctx ) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let title = data.get("title").trim();
        let category = data.get("category").trim();
        let maxLevel = data.get("maxLevel").trim();
        let imageUrl = data.get("imageUrl").trim();
        let summary = data.get('summary').trim();
        if(title === "" || category === "" || maxLevel === "" || imageUrl === "" || summary === ""){
            window.alert('All fields are required!');
        }else{
            api.create().then(() => ctx.page.redirect('/'));
        }
    }
    ctx.render(createTemplate(onSubmit))
}
