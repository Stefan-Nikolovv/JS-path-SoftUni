import {render} from "../node_modules/lit-html/lit-html.js";

import { navigationHandler } from "../views/navigationHandler.js";
import * as data from '../authService/data.js';
const navBarEl = document.querySelector('.nav-bar');
const mainEl = document.getElementById('content');
 
export const context = (templateResult) => {
    render(templateResult,mainEl);
}

export const middlewareNav = (ctx, next) => {
    render(navigationHandler(ctx),navBarEl)
    next();
}


export const middlewareLogin = (ctx, next) => {
    ctx.render = context;
    next();
  }

  export const loggedUser = (ctx,next)=> {
    ctx.user = data.getUser()
    next();
  }
