 import {html} from "../node_modules/lit-html/lit-html.js";

 import * as api from "../src/api.js";

 const registerTemplate = (onSubmit) => html`
  <section id="registerPage">
            <form class="registerForm" @submit = ${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>
 `;

 export const registerHandler =(ctx) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let email = data.get('email').trim();
        let password = data.get('password').trim();
        let repPass = data.get('repeatPassword').trim();
        if(email == "" || password == "" || repPass == ""){
            window.alert(`All fields are requared!`);
        }else{
            if(password != repPass ){
                window.alert(`Password is not match!`);
            }else{
                api.register(email,password)
                .then(() => ctx.page.redirect("/"))
            }

        }
        
        // api.register(email,password )
        // .then(() => ctx.page.regirect("/home"))
    }
    ctx.render(registerTemplate(onSubmit));
 }