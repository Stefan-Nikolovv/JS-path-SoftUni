import { html } from "../node_modules/lit-html/lit-html.js";
import * as api  from "../src/api.js"
const Templating = (post)=> html`
 <div class="allGames">
                <div class="allGames-info">
                    <img src=${post.imageUrl}>
                    <h6>${post.category}</h6>
                    <h2>${post.title}</h2>
                    <a href="/details/${post._id}" class="details-button">Details</a>
                </div>
`

const catalogueTemplate = (posts) => html`
 <section id="catalog-page">
            <h1>All Games</h1>
            <!-- Display div: with information about every game (if any) -->
           ${posts.length === 0 ?
           html`<h3 class="no-articles">No articles yet</h3>`
            :
            posts.map(Templating)
           }

            <!-- Display paragraph: If there is no games  -->
            
        </section>
`;

    export const catalogueHandler = ( ctx ) => {
        api.catalogue().then(posts =>{
            ctx.render(catalogueTemplate(posts))
        })
    } 
