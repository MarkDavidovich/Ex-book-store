'use strict'

var gBooks = [
    {
        id: 'abc12',
        title: 'Lorem Ipsum 2: the sequel',
        price: 120,
        imgUrl: 'nothingATM1.jpg'
    },

    {
        id: 'def23',
        title: 'Programming for dummies',
        price: 200,
        imgUrl: 'nothingATM2.jpg'
    },

    {
        id: 'ghi34',
        title: 'How to find free time during a bootcamp course',
        price: 5000,
        imgUrl: 'nothingATM3.jpg'
    },

]

function getBooks() {
    if (gBooks) return gBooks
}

function onDeleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    renderBooks()
}

function onUpdateBook(bookId, bookPrice) {
    const newPrice = +prompt("Enter new price:", bookPrice)
    if (newPrice !== null) updateBookPrice(bookId, newPrice)
}

function updateBookPrice(bookId, newPrice) {
    const bookToUpdate = gBooks.find(book => book.id === bookId)
    bookToUpdate.price = newPrice
    renderBooks()
}

function onAddBook() {
    const bookTitle = prompt('Enter a title:')
    const bookPrice = +prompt('Enter a price:')

    addNewBook(bookTitle, bookPrice)
}

function addNewBook(title, price) {
    var newBook = {
        id: makeId(3),
        title,
        price,
        imgUrl: 'none'
    }
    gBooks.push(newBook)
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

function onCloseModal() {
    const elBookModal = document.querySelector('.book-modal')
    elBookModal.classList.remove('active')
}
