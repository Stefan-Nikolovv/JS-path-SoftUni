import page from '../node_modules/page/page.mjs';
import {renderNavigationMiddleware, renderContentMiddleware,renderLoginMiddleware } from '../renderMiddleware/renderNavBar.js';
import {loginView} from '../views/loginView.js';
import {homeView} from '../views/homeView.js'
page(renderContentMiddleware)
page(renderLoginMiddleware);
page(renderNavigationMiddleware);
page('/',homeView);
page('/login', loginView);
page.start();