import page from '../node_modules/page/page.mjs';
import {middlewareNav,middlewareLogin,Islogged} from '../middlewareRendering/middleware.js'
import {loginHandler} from '../views/loginView.js';
import { registerView } from '../views/registerView.js';
import { logoutView } from '../views/logoutView.js';
import { dashboardView } from '../views/dashboardView.js';
import { createView } from '../views/createView.js';
import { detailView } from '../views/itemDetailsView.js';
import { editView } from '../views/editView.js';
import { homeView } from '../views/homeView.js';
import { deleteView } from '../views/deleteView.js';
import { serachView } from '../views/searchView.js';
page(Islogged);
page(middlewareNav);
page(middlewareLogin)
page('/', homeView)
page('/login',loginHandler);
page('/register',registerView);
page('/logout', logoutView)
page("/dashboard", dashboardView)
page('/create', createView);
page ('/search', serachView);
page(`/details/:postId`, detailView)
page('/shoes/:postId/edit',editView);
page('/shoes/:postId/delete',deleteView)
page.start();