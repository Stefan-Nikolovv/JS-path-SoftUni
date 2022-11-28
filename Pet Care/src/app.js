import page from "../node_modules/page/page.mjs";
import {middlewareLogin, middlewareNav} from "../middleware/middlawere.js";
import { homeHandler } from "../views/homeHandler.js";
import { loginHandler } from "../views/loginHandler.js";
import { registerHandler } from "../views/registerHandler.js";
import { logoutHandler } from "../views/logoutHandler.js";

page(middlewareNav);
page(middlewareLogin);
page('/home',homeHandler);
page('/login',loginHandler);
page("/register", registerHandler);
page("/logout", logoutHandler);

page.start();