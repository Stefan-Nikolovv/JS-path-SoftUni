import { html, nothing } from "../node_modules/lit-html/lit-html.js";

import * as api from "../src/api.js"

const detailsTemplate = (result, isOwner, logged, ctx) =>
    html`
${logged ? html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${result.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${result.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${result.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${result.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${result.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${result.sales}</span></p>
        </div>



        ${isOwner ? html`<div id="action-buttons">
            <div id="likes">Likes: <span id="likes-count">${ctx.totalLikes}</span></div>
            <a href="/details/${result._id}/edit" id="edit-btn">Edit</a>
            <a href="/details/${result._id}/delete" id="delete-btn">Delete</a>
        </div>`
          :
          html`<div id="action-buttons">
            <div id="likes">Likes: <span id="likes-count">${ctx.totalLikes}</span></div>
            ${ctx.zeroOrOne > 0 ? html`` :
                        html`<a @click=${e => onLike(e, ctx)} id="like-btn">Like</a>`
                    }


        </div>`
        }

    </div>
</section>
` :
html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${result.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${result.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${result.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${result.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${result.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${result.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">0</span></div>
    </div>
</section>
`
}
`;

export const detailsHandler = (ctx) => {
    api.getItem(ctx.params.postId).then(async (result) => {
        ctx.totalLikes = await api.allLikes(ctx.params.postId);


        let isOwner = false;
        let logged = false;
        if (ctx.user != undefined) {
            logged = true;
            ctx.zeroOrOne = await api.userApplies(ctx.params.postId, ctx.user._id);

            if (ctx.user._id == result._ownerId) {
                isOwner = true;
            }
        }

        ctx.render(detailsTemplate(result, isOwner, logged, ctx));
    });

}

async function onLike(e, ctx) {
    e.preventDefault();
    api.like(ctx.params.postId).then(() => ctx.page.redirect(`/details/${ctx.params.postId}`))
}