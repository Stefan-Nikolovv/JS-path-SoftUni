import {render} from '../node_modules/lit-html/lit-html.js';
import {navigationView} from '../views/navigationView.js';

const headerNavBarElement = document.querySelector('.header-nav');
const loginElement = document.getElementById('main-content');
const renderContent = (templateResult) => {
    render(templateResult, loginElement)
}

export const renderNavigationMiddleware = (ctx, next) =>{
    render(navigationView(ctx),headerNavBarElement);
    next();
}
export const renderContentMiddleware = (ctx, next) => {
    ctx.render = renderContent;
    next()
}
export const renderLoginMiddleware = (ctx, next) =>{
    let user = localStorage.getItem('user');
    if(user){
        ctx.user = user;
    }
    next();
}