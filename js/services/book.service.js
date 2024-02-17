'use strict'

var gBooks = _loadBooks()
var gFilteredBooks = gBooks
var successMsgTimeout

function getBooks() {
    return gBooks
}

function onDeleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)

    showSuccessMsg('Book deleted successfully!')
    _saveBooks(gBooks)
    renderBooks()
}

function onUpdateBook(bookId, bookPrice) {
    const newPrice = +prompt("Enter new price:", bookPrice)
    if (newPrice !== null) updateBookPrice(bookId, newPrice)
}

function updateBookPrice(bookId, newPrice) {
    const bookToUpdate = gBooks.find(book => book.id === bookId)
    bookToUpdate.price = newPrice

    showSuccessMsg('Book updated successfully!')
    _saveBooks(gBooks)
    renderBooks()
}

function onAddBook() {
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

    showSuccessMsg('Book added successfully!')
    _saveBooks(gBooks)
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
    console.log('searching')
    const searchInput = document.getElementById('searchInput').value.toLowerCase()
    gFilteredBooks = gBooks.filter(book => book.title.toLowerCase().includes(searchInput))
    renderBooks()
}

function onClearSearch() {
    document.getElementById('searchInput').value = ''
    gFilteredBooks = gBooks
    renderBooks()
}

function onCloseModal() {
    const elBookModal = document.querySelector('.book-modal')
    elBookModal.classList.remove('active')
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