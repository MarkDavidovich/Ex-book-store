'use strict'

var gBooks = [
    {
        id: 123,
        title: 'book1',
        price: 120,
        imgUrl: 'nothingATM1.jpg'
    },

    {
        id: 234,
        title: 'book2',
        price: 200,
        imgUrl: 'nothingATM2.jpg'
    },

    {
        id: 345,
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
    console.log('UPDATE:', bookPrice)
    const newPrice = +prompt("Enter new price:", bookPrice)
    if (newPrice !== null) updateBookPrice(bookId, newPrice)
}

function updateBookPrice(bookId, newPrice) {
    console.log(bookId, newPrice)
    const bookToUpdate = gBooks.find(book => book.id === bookId)
    bookToUpdate.price = newPrice
    renderBooks()
}