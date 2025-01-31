import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBookById, updateBook } from '../api/data.js';
`<!-- Edit Page ( Only for the creator )-->
<section id="edit-page" class="edit">
    <form id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" value="A Court of Thorns and Roses">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" value="/images/book1.png">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value="Fiction">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`

function getTemplate(book){
html`<section id="edit-page" class="edit">
            <form id="editForm">
                <fieldset>
                    <legend>Edit Book</legend>
                    <label for="title">Title: <input type="text" name="title" id="title" value="${book.title}"></label>
                    <label for="description">Description: <textarea name="description" id="description">${book.description}</textarea></label>
                    <label for="image">Image: <input type="text" name="imageUrl" id="imageUrl" value="${book.imageUrl}"></label>
                    <label for="type">Type: <input type="text" name="type" id="type" value="${book.type}"></label>
                    <button type="submit">Save Changes</button>
                </fieldset>
            </form>
        </section>`
}
export function editPage(ctx, id){
    const book = getBookById(id)
    ctx.render(getTemplate(book));
    document.getElementById('editForm').addEventListener('submit', (event) => onSubmit(event, id));

}
async function onSubmit(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
        await updateBook(id, {
            title: formData.get('title'),
            description: formData.get('description'),
            imageUrl: formData.get('imageUrl'),
            type: formData.get('type'),
        });
        navigateTo(`/details/${id}`);
    } catch (err) {
        alert('Failed to update book');
    }
}