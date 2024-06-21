import { html } from '../../node_modules/lit-html/lit-html.js';
import { createBook } from '../api/data.js';
`<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="create">
    <form id="create-form" action="" method="">
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
    </form>
</section>`

function getTemplate() {
    html`
        <section id="create-page" class="create">
            <form id="createForm">
                <fieldset>
                    <legend>Add new Book</legend>
                    <label for="title">Title: <input type="text" name="title" id="title"></label>
                    <label for="description">Description: <textarea name="description" id="description"></textarea></label>
                    <label for="image">Image: <input type="text" name="imageUrl" id="imageUrl"></label>
                    <label for="type">Type: <input type="text" name="type" id="type"></label>
                    <button type="submit">Add Book</button>
                </fieldset>
            </form>
        </section>
    `;
}

async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        await createBook({
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            type: formData.get('type'),
        });
        navigateTo('/catalog');
    } catch (err) {
        alert('Failed to create book');
    }
}
export function createPage(ctx){
    ctx.render(getTemplate);
    document.getElementById('createForm').addEventListener('submit', onCreate);
}