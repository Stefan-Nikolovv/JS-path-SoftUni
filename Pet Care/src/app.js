import page from "../node_modules/page/page.mjs";
import {loggedUser, middlewareLogin, middlewareNav} from "../middleware/middlawere.js";
import { homeHandler } from "../views/homeHandler.js";
import { loginHandler } from "../views/loginHandler.js";
import { registerHandler } from "../views/registerHandler.js";
import { logoutHandler } from "../views/logoutHandler.js";
import { dashBoardHandler } from "../views/dashboardHandler.js";
import { createHandler } from "../views/createHandler.js";
import { detailsHandler } from "../views/detailsHandler.js";
import { editHandler } from "../views/editHandler.js";
import { deleteHandler } from "../views/deleteHandler.js";

page(loggedUser);
page(middlewareNav);
page(middlewareLogin);
page('/',homeHandler);
page('/login',loginHandler);
page("/register", registerHandler);
page("/logout", logoutHandler);
page('/dashboard', dashBoardHandler);
page("/create", createHandler);
page("/details/:postId",detailsHandler);
page("/details/:postId/edit",editHandler);
page("/details/:postId/remove",deleteHandler);


page.start();