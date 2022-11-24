 import * as api from "../api.js"



 export const deleteView = (ctx) => {
    let delElement = ctx.path.split("/")
    if(delElement[3] == 'delete'){
       let confrimed = confirm('Are you sure you want to delete this shoe?');
       if(confrimed){
        api.removeItem(ctx.params.postId)
        .then(() => ctx.page.redirect('/dashboard'))
       }else{
         
       }
    }
    
}