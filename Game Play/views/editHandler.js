import { html } from "../node_modules/lit-html/lit-html.js";

import * as api from "../src/api.js"

const editTemplate = (onSubmit ,post) => html `
<section id="edit-page" class="auth">
            <form id="edit" @submit = ${onSubmit}>
                <div class="container">

                    <h1>Edit Game</h1>
                    <label for="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value=${post.title}>

                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category" value=${post.category}>

                    <label for="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" value=${post.maxLevel}>

                    <label for="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value=${post.imageUrl}>

                    <label for="summary">Summary:</label>
                    <textarea name="summary" id="summary">${post.summary}</textarea>
                    <input class="btn submit" type="submit" value="Edit Game">

                </div>
            </form>
        </section>
`;
 
export const editHnadler = (ctx) => {
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
            api.edit(ctx.params.postId,title,category,maxLevel,imageUrl,summary)
            .then(() => ctx.page.redirect(`/details/${ctx.params.postId}`))
        }
        
    }
    api.getItem(ctx.params.postId).then(post => ctx.render(editTemplate(onSubmit,post)))
}