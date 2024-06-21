import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/data.js';
`<!-- Register Page ( Only for Guest users ) -->
<section id="register-page" class="register">
    <form id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
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
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>`
export function showRegister(ctx) {
    ctx.render(getTemplate);
    document.getElementById('registerForm').addEventListener('submit', onRegister);
}
function getTemplate() {
    html`
        <section id="register-page" class="register">
            <form id="registerForm">
                <fieldset>
                    <legend>Register</legend>
                    <label for="email">Email: <input type="email" name="email" id="email"></label>
                    <label for="password">Password: <input type="password" name="password" id="password"></label>
                    <label for="rePass">Repeat Password: <input type="password" name="repeatPassword" id="repeatPassword"></label>
                    <button type="submit">Register</button>
                </fieldset>
                <p class="error-message" style="display: none;">Passwords do not match</p>
            </form>
        </section>
    `;
}

async function onRegister(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get('password') !== formData.get('repeatPassword')) {
        showError('Passwords do not match');
        return;
    }
    try {
        await register(formData.get('email'), formData.get('password'));
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