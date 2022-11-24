import {render} from '../node_modules/lit-html/lit-html.js';
import { navigationHandler } from '../views/navigationHandler.js';
import { getUser } from '../api.js';

const headerEl = document.querySelector(".nav-bar");
const mainElement = document.querySelector(".main-info")
export const contentText = (templateResult) => {
    render(templateResult,mainElement);
}

export const navBarMIddleware = (ctx,next) =>{
    render(navigationHandler(ctx), headerEl)
    next();
}

export const middlewareRender = (ctx, next) => {
    ctx.render = contentText;
    next();
  }

  export const loginNavigate = (ctx,next) => {
    ctx.user = getUser();
    next()
  }

