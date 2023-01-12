import page from "../node_modules/page/page.mjs";
import {loggedUser, middlewareRender, navBarMIddleware} from "../middleware/middleware.js";
import { loginHandler } from "../views/loginHandler.js";
import { registerHandler } from "../views/registerHandler.js";
import {logoutHandler} from "../views/logoutHandler.js"
import { catalogueHandler } from "../views/catalogueHandler.js";
import { homeHandler } from "../views/homeHandler.js";
import { createHandler } from "../views/createHandler.js";
import {datailHandler} from "../views/detailHandler.js";




page(loggedUser);
page(navBarMIddleware);
page(middlewareRender);
page('/',homeHandler);
page('/login',loginHandler);
page('/register', registerHandler);
page("/logout", logoutHandler);
page("/catalog", catalogueHandler);
page('/create', createHandler);
page("/details/:postId", datailHandler);


page.start();