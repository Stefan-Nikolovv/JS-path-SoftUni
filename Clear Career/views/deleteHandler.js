import * as api from '../api.js';


export const deleteHandler =(ctx) => {
    let del = ctx.path.split('/') 
    if(del[3] === "delete"){
     let conf =  window.confirm('Do you want to delete this item?')
     if(conf){
         api.del(ctx.params.postId).then(() => ctx.page.redirect('/dashboard'))
     }else{
        ctx.page.redirect(`/offers/${ctx.params.postId}`);
     }
    }
}