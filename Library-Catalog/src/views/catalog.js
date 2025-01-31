import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../api/data.js';

`<!-- Dashboard Page ( for Guests and Users ) -->
<section id="dashboard-page" class="dashboard">
    <h1>All Books</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    <ul class="other-books-list">
        <li class="otherBooks">
            <h3>A Court of Thorns and Roses</h3>
            <p>Type: Fiction</p>
            <p class="img"><img src="./images/book1.png"></p>
            <a class="button" href="#">Details</a>
        </li>

        <li class="otherBooks">
            <h3>Outlander</h3>
            <p>Type: Other</p>
            <p class="img"><img src="/images/book2.png"></p>
            <a class="button" href="#">Details</a>
        </li>

        <li class="otherBooks">
            <h3>To Kill a Mockingbird</h3>
            <p>Type: Classic</p>
            <p class="img"><img src="/images/book3.png"></p>
            <a class="button" href="#">Details</a>
        </li>
    </ul>
    <!-- Display paragraph: If there are no books in the database -->
    <p class="no-books">No books in database!</p>
</section>`

/*export async function catalogPage() {
    render(catalogTemplate());
}*/

function getBooks(){
    const data = getAllBooks().then(r => r.json()).then(result = console.log(result));
    console.log(data);
}
getBooks();
const catalogTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>All Books</h1>
  ${books.length === 0 
    ? html`<p class="no-books">No books in database!</p>`
    : books.map(bookTemplate)}

</section>`;
const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <a class="button" href="${`/details/${book.id}`}">Details</a>
    </li>`
export async function catalogPage(ctx) {
    // const books = await getAllBooks();
    console.log(books);
    ctx.render(catalogTemplate({}));
}