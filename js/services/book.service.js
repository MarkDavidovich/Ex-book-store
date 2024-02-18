'use strict'

var gBooks = _createBooks(6)
var gFilteredBooks = gBooks // This needs to be changed to work in getBooks
var gSuccessMsgTimeout
var gSortToggle = { isTitleDescending: true, isPriceDescending: true, isRatingDescending: true }
var gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
    sortBy: {},
    page: { currPage: 1, size: 5 }
}
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
    if (newPrice === null || newPrice === 0) return
    updateBookPrice(bookId, newPrice)
    showSuccessMsg('Book updated successfully!')
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
    showSuccessMsg('Book added successfully!')

    _saveBooks(gBooks)
}

function searchChange() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase()
    gFilteredBooks = gBooks.filter(book => {
        const titleMatches = book.title.toLowerCase().includes(searchInput)
        const ratingMatches = book.rating >= gQueryOptions.filterBy.rating
        return titleMatches && ratingMatches
    })
    gQueryOptions.filterBy.txt = searchInput
    renderBooks()
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
        case 'rating':
            gFilteredBooks.sort((a, b) => {
                return gSortToggle.isRatingDescending ? b.rating - a.rating : a.rating - b.rating
            })
            break
    }
    if (criteria === 'title') {
        gSortToggle.isTitleDescending = !gSortToggle.isTitleDescending
    } else if (criteria === 'price') {
        gSortToggle.isPriceDescending = !gSortToggle.isPriceDescending
    } else {
        gSortToggle.isRatingDescending = !gSortToggle.isRatingDescending
    }
}

function drawStars(rating) {
    const star = '⭐'
    return star.repeat(rating)
}

function filterBooks(books) {
    return books.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(gQueryOptions.filterBy.txt.toLowerCase())
        const ratingMatch = book.rating >= gQueryOptions.filterBy.rating

        console.log(`Book: ${book.title}, Title Matches: ${titleMatch}, Rating Matches: ${ratingMatch}`)

        return titleMatch && ratingMatch
    })
}

