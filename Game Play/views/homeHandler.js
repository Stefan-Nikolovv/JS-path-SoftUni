import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js"
const templating = (post) => html`
<div class="game">
        <div class="image-wrap">
            <img src=${post.imageUrl}>
        </div>
        <h3>${post.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/details/${post._id}" class="btn details-btn">Details</a>
        </div>
    </div>
`

const homeTemplate = (posts) => html`
 <section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>
    ${posts.length === 0 ?
    html`<p class="no-articles">No games yet</p>` :
    posts.map(templating)
}
   
   
</div>
</section>
`;

export const homeHandler =(ctx) => {
    api.home()
    .then(posts => {
        ctx.render(homeTemplate(posts))
    })
}