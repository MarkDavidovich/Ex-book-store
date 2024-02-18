'use strict'

var gBooks = _createBooks(6)
var gFilteredBooks = gBooks // This needs to be changed to work in getBooks
var gSuccessMsgTimeout
var gSortToggle = { isTitleDescending: true, isPriceDescending: true }

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

function addBook(title, price) {
    if (!title || !price) return
    const newBook = _createBook(title, price)
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

function _createBooks(count) {
    var books = _loadBooks(BOOKS_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < count; i++) {
            books.push(
                _createBook(
                    `Coding for dummies vol. ${i + 1}`,
                    30 + parseInt(Math.random() * 100),
                )
            )
        }
    }
    console.log('books', books)
    _saveBooks(books)
    return books
}

function _createBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: imgUrl || 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg',
        rating: getRandomIntInclusive(1, 5)
    }
}

//Book shop 2

function sortBooks(criteria) {

    // const elTitlePlus = document.querySelector('.title-plus')
    // const elTitleMinus = document.querySelector('.title-minus')
    // const elPricePlus = document.querySelector('.price-plus')
    // const elPriceMinus = document.querySelector('.price-minus')
    switch (criteria) {
        case 'title':
            gFilteredBooks.sort((a, b) => {
                const titleA = a.title.toLowerCase()
                const titleB = b.title.toLowerCase()
                return gSortToggle.isTitleDescending ? titleB.localeCompare(titleA) : titleA.localeCompare(titleB)
            })
            break
        case 'price':
            gFilteredBooks.sort((a, b) => {
                return gSortToggle.isPriceDescending ? b.price - a.price : a.price - b.price
            })
            break
    }
    // if (criteria === 'title' && gSortToggle.isTitleDescending) {
    //     console.log('color changed!')
    //     elTitlePlus.classList.add('red')
    //     elTitleMinus.classList.remove('red')
    // }
    // else if (criteria === 'title' && !gSortToggle.isTitleDescending) {
    //     elTitleMinus.classList.add('red')
    //     elTitlePlus.classList.remove('red')
    // }
    // NEED TO CHANGE THE MODEL!
    criteria === 'title' ? gSortToggle.isTitleDescending = !gSortToggle.isTitleDescending : gSortToggle.isPriceDescending = !gSortToggle.isPriceDescending
}

function drawStars(rating) {
    const star = '⭐'
    var starsStr = ''
    for (let i = 0; i < rating; i++) {
        starsStr += star
    }
    return starsStr
}