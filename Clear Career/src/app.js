import { navBarMIddleware, middlewareRender,loginNavigate} from "../middleware/middlewareView.js";
import page from  "../node_modules/page/page.mjs";
import { dashboardHandler } from "../views/dashboardHandler.js";
import { homeView } from "../views/homeHander.js";
import { loginHandler } from "../views/loginHandler.js";
import { logoutHandler } from "../views/logoutHandler.js";
import { registerHandler } from "../views/registerHandler.js";
import {createOfferHandler} from "../views/createOfferHandler.js"
import { detailsHandler } from "../views/detailsHandler.js";
import { editOfferHandler } from "../views/editOfferHandler.js";
import{deleteHandler} from "../views/deleteHandler.js";



page(loginNavigate);
page(navBarMIddleware);
page(middlewareRender)
page('/', homeView);
page('/login',loginHandler);
page('/register', registerHandler);
page('/logout',logoutHandler)
page('/dashboard', dashboardHandler);
page('/create', createOfferHandler );
page("/details/:postId",detailsHandler);
page('/details/:postId/edit', editOfferHandler)
page('/details/:postId/delete', deleteHandler);

 page.start();