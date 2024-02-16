'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {

    const strHTMLs = gBooks.map(book => `<tr><td>${book.title}</td><td>${book.price}</td><td>
    <button class="read-btn">read</button><button class="update-btn">update</button><button
            class="delete-btn">delete</button></td></tr>`)

    const elBookTable = document.querySelector('.table-container')
    elBookTable.innerHTML += strHTMLs.join('')
}