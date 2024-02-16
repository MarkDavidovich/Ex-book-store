'use strict'

var gBooks = [
    {
        id: 'abc12',
        title: 'book1',
        price: 120,
        imgUrl: 'nothingATM1.jpg'
    },

    {
        id: 'def23',
        title: 'book2',
        price: 200,
        imgUrl: 'nothingATM2.jpg'
    },

    {
        id: 'ghi34',
        title: 'book3',
        price: 400,
        imgUrl: 'nothingATM3.jpg'
    },

]

function getBooks() {
    if (gBooks) return gBooks
}

function onDeleteBook(bookId) {
    console.log('REMOVE:', bookId)
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