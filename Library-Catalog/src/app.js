import { render } from '../node_modules/lit-html/lit-html.js';
import  page from '../node_modules/page/page.mjs';
import { logout } from './api/api.js'
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
// import { showLogin } from './api/login.js';
// import { profilePage } from './api/profile.js'
import { showRegister } from './views/register.js';

const main = document.querySelector('main')
document.getElementById("logoutBtn").addEventListener("click", onLogout);

page(decorateContext);
page('/catalog', catalogPage)
// page('/login', decorateContext, showLogin)
// page('/profile', decorateContext, profilePage)

page('/register', decorateContext, showRegister)
page('/create', decorateContext, createPage)
page('/edit/:id', decorateContext, editPage)
page('/details/:id', decorateContext, detailsPage)

updateNav();
page.start();


function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.updateNav = updateNav;

  // const userData = getUserData();
  // if (userData) {
  //   ctx.userData = userData;
  // }
  console.log('next');
  next();
}

function updateNav() {
  // const userData = getUserData();

  // if (userData) {
  //   document.querySelector(".user").style.display = "block";
  //   document.querySelector(".guest").style.display = "none";

  // } else {
  //   document.querySelector(".user").style.display = "none";
  //   document.querySelector(".guest").style.display = "block";
  // }
}

function onLogout() {
  logout();

  updateNav();
  page.redirect("/");
}

function onHome() {

  console.log('home');
}