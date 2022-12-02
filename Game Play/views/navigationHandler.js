import {html} from "../node_modules/lit-html/lit-html.js"

const navigationTemplate = (user) => html`
 <!-- Navigation -->
 ${user ? html`
 <h1><a class="home" href="/">GamesPlay</a></h1>
            <nav>
                <a href="/catalog">All games</a>
                <!-- Logged-in users -->
                <div id="user">
                    <a href="create">Create Game</a>
                    <a href="/logout">Logout</a>
                </div>
                </nav>` : html`
                <h1><a class="home" href="/">GamesPlay</a></h1>
                <nav>
                <a href="/catalog">All games</a>
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div> 
            </nav>
                `}
                <!-- Guest users -->
                
           
        </header>
`;

export const  navigationHandler =(ctx) => {
    return navigationTemplate(!!ctx.user);
}