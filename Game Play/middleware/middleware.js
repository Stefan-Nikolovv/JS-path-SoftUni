import { render } from "../node_modules/lit-html/lit-html.js";
import { navigationHandler } from "../views/navigationHandler.js";
const navEl = document.querySelector(".nav-bar");
const mainElement = document.getElementById("main-content");
import { getUser } from "../authService/data.js";
export const context = (templateResult) => {
 render(templateResult,mainElement);
}

export const navBarMIddleware = (ctx,next) => {
    render(navigationHandler(ctx), navEl)
    next();
}

export const middlewareRender = (ctx, next) => {
    ctx.render = context;
    next();
  }

  export const loggedUser = (ctx,next) => {
    ctx.user = getUser()
    next();
  } 