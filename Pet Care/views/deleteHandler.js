

import * as api from '../src/api.js';


export const deleteHandler =(ctx) => {
    let del = ctx.path.split('/') 
    if(del[3] === "remove"){
     let conf =  window.confirm('Do you want to delete this item?')
     if(conf){
         api.del(ctx.params.postId).then(() => ctx.page.redirect('/'))
     }else{
        ctx.page.redirect(`/details/${ctx.params.postId}`);
     }
    }
}