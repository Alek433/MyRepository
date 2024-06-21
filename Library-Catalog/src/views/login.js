import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';

`<!-- Login Page ( Only for Guest users ) -->
<section id="login-page" class="login">
    <form id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
        </fieldset>
    </form>
</section>`

function loginTemplate(){
    html`
<section id="login-page" class="login">
    <form id="loginForm">
        <fieldset>
            <legend>Login</legend>
                <label for="email">Email: <input type="email" name="email" id="email"></label>
                <label for="password">Password: <input type="password" name="password" id="password"></label>
                <button type="submit">Login</button>
        </fieldset>
        <p class="error-message" style="display: none;">Invalid login credentials</p>
    </form>
</section>
`
} 

export function showLogin(ctx) {
    ctx.render(loginTemplate);
    document.getElementById('loginForm').addEventListener('submit', onLogin);
  }

async function onLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        await login(formData.get('email'), formData.get('password'));
        navigateTo('/catalog');
    } catch (err) {
        showError(err.message);
    }
}

function showError(message) {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}