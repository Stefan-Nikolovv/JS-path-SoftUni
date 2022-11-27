import {render} from "../node_modules/lit-html/lit-html.js";
import { navigationVIew } from "../views/navigationView.js";
import * as api from "../src/api.js";
  const middlewareEl = document.querySelector('.main-context');
  const middlewareNavEl = document.querySelector('.nav-bar');
  export const renderContet = (templateResult) => {
    render(templateResult,middlewareEl);
}

export const middlewareNav = (ctx, next) => {
    render(navigationVIew(ctx),middlewareNavEl)
    next();
}
export const middlewareLogin = (ctx, next) => {
  ctx.render = renderContet;
  next();
}
export const Islogged = (ctx,next) => {
  ctx.user = api.getUser();
  next();
}
