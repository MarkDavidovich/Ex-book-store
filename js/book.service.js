'use strict'

var gBooks = [
    {
        id: 1,
        title: 'book1',
        price: 120,
        imgUrl: 'nothingATM1.jpg'
    },

    {
        id: 2,
        title: 'book2',
        price: 200,
        imgUrl: 'nothingATM2.jpg'
    },

    {
        id: 3,
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

function onUpdateBook(bookPrice) {
    console.log('UPDATE:', bookPrice)
    var currBook;

}