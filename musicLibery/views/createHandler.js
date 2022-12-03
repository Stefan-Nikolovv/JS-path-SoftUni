import {html} from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js";

const createTemplate =(onSubmit) => html`
<section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form class="create-form" @submit = ${onSubmit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export const createHandler =(ctx) => {
    const onSubmit =(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let singer = data.get("singer").trim();
        let album = data.get("album").trim();
        let imageUrl = data.get("imageUrl").trim();
        let release = data.get("release").trim();
        let label = data.get("label").trim();
        let sales = data.get("sales").trim();
        if(singer == "" || album == "" || imageUrl == "" || release == "" || label == "" || sales == ""){
            window.alert(`All fields are required!`);
        }else{
           api.create(singer,album,imageUrl,release,label,sales)
           .then(()=> ctx.page.redirect('/dashboard')) 
        }
    }
    ctx.render(createTemplate(onSubmit));
}