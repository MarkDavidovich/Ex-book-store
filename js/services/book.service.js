'use strict'

var gBooks = _loadBooks()
var gFilteredBooks = gBooks
var successMsgTimeout

function getBooks() {
    return gBooks
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)

    _saveBooks(gBooks)
}

function updateBook(bookId, bookPrice) {
    const newPrice = +prompt("Enter new price:", bookPrice)
    if (newPrice !== null) updateBookPrice(bookId, newPrice)
}

function updateBookPrice(bookId, newPrice) {
    const bookToUpdate = gBooks.find(book => book.id === bookId)
    bookToUpdate.price = newPrice

    _saveBooks(gBooks)
}

function addBook() {
    const bookTitle = prompt('Enter a title:')
    const bookPrice = +prompt('Enter a price:')

    if (!bookTitle || !bookPrice) return
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
    _saveBooks(gBooks)
}

function searchChange() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase()
    gFilteredBooks = gBooks.filter(book => book.title.toLowerCase().includes(searchInput))
}

function clearSearch() {
    document.getElementById('searchInput').value = ''
    gFilteredBooks = gBooks
}

function onCloseModal() {
    const elBookModal = document.querySelector('.book-modal')
    elBookModal.classList.remove('active')
}
