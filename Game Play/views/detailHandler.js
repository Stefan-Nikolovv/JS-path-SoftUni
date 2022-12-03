import { html } from "../node_modules/lit-html/lit-html.js";
  
import * as api from "../src/api.js"


const detailTemplate = (post,logged,isOwner,ctx,onSubmit) => html`
 
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
      ${ctx.comment.length === 0 ? html`
      <div class="details-comments">
      <p class="no-comment">No comments.</p>
      </div> ` :
    html ` <div class="details-comments">
        <h2>Comments:</h2>
        <ul>
          <!-- list all comments for current game (If any) -->
          <li class="comment">
            <p>Content: ${ctx.newComment}.</p>
          </li>
          <li class="comment">
            <p>Content: The best game.</p>
          </li>
        </ul>
        </div>`
    }
      <article class="create-comment">
      <label>Add new comment:</label>
      <form class="form" @submit = ${onSubmit}>
        <textarea name="comment" placeholder="Comment......">${ctx.newComment}</textarea>
        <input class="btn submit" type="submit" value="Add Comment" />
      </form>
    </article>
  `}
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

      
    }
     
        <!-- Display paragraph: If there are no games in the database -->
        </section>  
      `
    
    }

    
   
`;

export const datailHandler = (ctx) => {
    api.getItem(ctx.params.postId)
    .then(async(post) => {
      const onSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let comment = data.get('comment').trim();
      ctx.newComment = await api.createComment(ctx.params.postId,comment)
      console.log(ctx.newComment.comment)
      }
     ctx.comment =await api.getComment(ctx.params.postId);
     
        let logged = false;
        let isOwner =  false;
        if(ctx.user != undefined){
            logged = true;
            if (ctx.user._id == post._ownerId) {
                isOwner = true;
            }
        }
        
        ctx.render(detailTemplate(post,logged,isOwner,ctx,onSubmit))
    })
   
}




// ${ctx.comment.length === 0 ? html`
//       <div class="details-comments">
//       <p class="no-comment">No comments.</p>
//       </div> ` :
//     html ` <div class="details-comments">
//         <h2>Comments:${ctx.comment}</h2>
//         <ul>
//           <!-- list all comments for current game (If any) -->
//           <li class="comment">
//             <p>Content: I rate this one quite highly.</p>
//           </li>
//           <li class="comment">
//             <p>Content: The best game.</p>
//           </li>
//         </ul>
//         </div>`