import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js"


const editTemplate =(onSubmit,result) => html`
<section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit = ${onSubmit} >
            <input type="text" .value =${result.singer} name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" .value =${result.album} name="album" id="album-album" placeholder="Album" />
            <input type="text" .value =${result.imageUrl} name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" .value =${result.release} name="release" id="album-release" placeholder="Release date" />
            <input type="text" .value =${result.label} name="label" id="album-label" placeholder="Label" />
            <input type="text" .value =${result.sales} name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export const editHandler =(ctx)=>{
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
           api.edit(ctx.params.postId,singer,album,imageUrl,release,label,sales)
           .then(()=> ctx.page.redirect(`/details/${ctx.params.postId}`)) 
        }

    }
    api.getItem(ctx.params.postId).then(result =>   ctx.render(editTemplate(onSubmit,result)))
}