import { html } from "../node_modules/lit-html/lit-html.js";
  
import * as api from "../src/api.js"


const detailTemplate = (post,logged,isOwner) => html`
 
     ${logged ? html `
     <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src=${post.imageUrl} />
        <h1>${post.title}</h1>
        <span class="levels">${post.maxLevel}</span>
        <p class="type">${post.category}</p>
      </div>

      <p class="text">
        ${post.summary}
      </p>
      
  ${isOwner ? html`
      <div class="buttons">
        <a href="${post._id}/edit" class="button">Edit</a>
        <a href="${post._id}/delete" class="button">Delete</a>
      </div>
    </div> 
      ` : html`
      <article class="create-comment">
      <label>Add new comment:</label>
      <form class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment" />
      </form>
    </article>
  </section> `}
     `:  html` <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src=${post.imageUrl} />
        <h1>${post.title}</h1>
        <span class="levels">${post.maxLevel}</span>
        <p class="type">${post.category}</p>
      </div>

      <p class="text">
        ${post.summary}
      </p>

      <!-- Bonus ( for Guests and Users ) -->
      <div class="details-comments">
        <h2>Comments:</h2>
        <ul>
          <!-- list all comments for current game (If any) -->
          <li class="comment">
            <p>Content: I rate this one quite highly.</p>
          </li>
          <li class="comment">
            <p>Content: The best game.</p>
          </li>
        </ul>
        <!-- Display paragraph: If there are no games in the database -->
        <p class="no-comment">No comments.</p>
      </div>`
    
    }

    
   
`;

export const datailHandler = (ctx) => {
    api.getItem(ctx.params.postId)
    .then((post) => {
        let logged = false;
        let isOwner =  false;
        if(ctx.user != undefined){
            logged = true;
            if (ctx.user._id == post._ownerId) {
                isOwner = true;
            }
        }
        
        ctx.render(detailTemplate(post,logged,isOwner))
    })
   
}