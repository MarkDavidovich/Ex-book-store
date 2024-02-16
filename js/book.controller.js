'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {

    const headerHTML = `<tr class="table-header"><th>Title</th><th>Price</th><th>Actions</th></tr>`
    const strHTMLs = gBooks.map(book => `<tr><td>${book.title}</td><td>${book.price}</td><td>
    <button class="read-btn">Read</button><button onclick="onUpdateBook(${book.id}, ${book.price})" class="update-btn">Update</button><button onclick="onDeleteBook(${book.id})"
            class="delete-btn">Delete</button></td></tr>`)

    const elBookTable = document.querySelector('.table-container')
    elBookTable.innerHTML = headerHTML + strHTMLs.join('')
}

