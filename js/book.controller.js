'use strict'

function onInit() {
    updateStatistics()
    clearTimeout(successMsgTimeout)
    renderBooks()
}

function renderBooks() {


    const headerHTML = `<tr class="table-header">
    <th>Title</th>
    <th>Price</th>
    <th>Actions</th>
    </tr>`

    const booksToRender = gFilteredBooks.length > 0 ? gFilteredBooks : []
    const elBookTable = document.querySelector('.table-container')

    if (booksToRender.length === 0) {
        elBookTable.innerHTML = '<p class="no-books-msg">No books found matching the criteria.</p>'
    } else {

        const strHTMLs = booksToRender.map(book => `<tr>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td>
    <button onclick="onReadBook('${book.id}')"class="read-btn">Read</button>
    <button onclick="onUpdateBook('${book.id}', ${book.price})" class="update-btn">Update</button>
    <button onclick="onDeleteBook('${book.id}')" class="delete-btn">Delete</button>
    </td>
    </tr>`)


        elBookTable.innerHTML = headerHTML + strHTMLs.join('')
    }
    updateStatistics()
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    showSuccessMsg('Book deleted successfully!')
    renderBooks()
}

function onUpdateBook(bookId, bookPrice) {
    updateBook(bookId, bookPrice)
    showSuccessMsg('Book updated successfully!')
    renderBooks()
}

function onAddBook() {
    const bookTitle = prompt('Enter a title:')
    const bookPrice = +prompt('Enter a price:')

    addBook(bookTitle, bookPrice)
    showSuccessMsg('Book added successfully!')
    renderBooks()
}

function onReadBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    const elBookModal = document.querySelector('.book-modal')
    const elTitleSpan = elBookModal.querySelector('h2 span')
    const elEtcSpan = elBookModal.querySelector('h4 span')

    elTitleSpan.innerText = book.title
    elEtcSpan.innerText = book.price

    elBookModal.classList.add('active')
}

function onSearchChange() {
    searchChange()
    renderBooks()
}

function onClearSearch() {
    clearSearch()
    renderBooks()
}


function showSuccessMsg(message) {
    const elSuccessMsg = document.querySelector('.success-msg')
    console.log('success message appears')
    elSuccessMsg.innerText = message
    elSuccessMsg.style.display = 'block'

    if (successMsgTimeout) {
        clearTimeout(successMsgTimeout);
    }

    successMsgTimeout = setTimeout(() => {
        elSuccessMsg.style.display = 'none'
        console.log('disappears')
    }, 2000)
}

function updateStatistics() {
    const expensiveCount = gBooks.filter(book => book.price > 200).length
    const averageCount = gBooks.filter(book => book.price >= 80 && book.price <= 200).length
    const cheapCount = gBooks.filter(book => book.price < 80).length

    console.log('Expensive Count:', expensiveCount)
    console.log('Average Count:', averageCount)
    console.log('Cheap Count:', cheapCount)

    document.getElementById('expensiveCount').textContent = expensiveCount
    document.getElementById('averageCount').textContent = averageCount
    document.getElementById('cheapCount').textContent = cheapCount
}

function onCloseModal() {
    const elBookModal = document.querySelector('.book-modal')
    elBookModal.classList.remove('active')
}