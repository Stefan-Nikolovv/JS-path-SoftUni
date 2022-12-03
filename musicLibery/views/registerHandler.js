import { html } from "../node_modules/lit-html/lit-html.js";
import * as api from "../src/api.js" 

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>
`;

export const registerHandler =(ctx)=> {
    const onSubmit =(e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        let email = data.get('email').trim();
        let password = data.get('password').trim();
        let repeatPass = data.get('re-password').trim();
        if(email == "" || password == "" || repeatPass == ""){
            window.alert(`All fileds are required!`);
        }else{
            if(password != repeatPass){
                window.alert(`passwords did not match!`);
            }else{
                api.register(email,password)
                .then(() => ctx.page.redirect("/dashboard"));
            }
        }
    }
    ctx.render(registerTemplate(onSubmit));
}