import { render } from '../node_modules/lit-html/lit-html.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { showLogin } from './api/login.js';
import { profile }  from './api/profile.js'
import { showRegister } from './views/register.js';
const main = document.querySelector('main')
document.getElementById("btnLogout").addEventListener("click", onLogout);

const routes = {
    '/': catalogPage,
    '/catalog': catalogPage,
    '/login': showLogin,
    '/register': showRegister,
    '/create': createPage,
    '/edit/:id': editPage,
    '/details/:id': detailsPage,
};



document.querySelector('nav').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        const url = new URL(event.target.href);
        event.preventDefault();
        navigateTo(url.pathname);
    }
});

window.addEventListener('load', () => {
    navigateTo(location.pathname);
});

window.addEventListener('popstate', () => {
    navigateTo(location.pathname);
});

function navigateTo(path) {
    const [route, id] = path.split('/').filter(Boolean);
    const view = routes[`/${route}${id ? '/:id' : ''}`];
    if (typeof view === 'function') {
        view(main, id);
    } else {
        console.error(`Route ${path} not found`);
    }
}

logoutLink.addEventListener('click', async (event) => {
    event.preventDefault();
    await logout();
    updateNav();
    navigateTo('/catalog');
});

function updateNav() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        createLink.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        createLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

updateNav();