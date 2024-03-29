'use strict'

function onInit() {
    updateStatistics()
    clearTimeout(gSuccessMsgTimeout)
    renderBooks()
}

function renderBooks() {
    const headerHTML = `<tr class="table-header">
    <th class="table-title" onclick="onSortBooks('title')">Title </th>
    <th class="table-price" onclick="onSortBooks('price')">Price </th>
    <th class="table-rating" onclick="onSortBooks('rating')">Rating </th>
    <th>Actions</th>
    </tr>`

    // const books = getBooks()

    const booksToRender = getBooksForCurrPage()

    const elBookTable = document.querySelector('.table-container')

    if (booksToRender.length === 0) {
        elBookTable.innerHTML = '<p class="no-books-msg">No books found matching the criteria.</p>'
    } else {

        const strHTMLs = booksToRender.map(book => `<tr>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td>${drawStars(book.rating)}</td>
    <td>
    <button onclick="onReadBook('${book.id}')"class="read-btn">Read</button>
    <button onclick="onUpdateBook('${book.id}', ${book.price})" class="update-btn">Update</button>
    <button onclick="onDeleteBook('${book.id}')" class="delete-btn">Delete</button>
    </td>
    </tr>`)


        elBookTable.innerHTML = headerHTML + strHTMLs.join('')
    }
    updateStatistics()
    setQueryParams()
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    showSuccessMsg('Book deleted successfully!')
    renderBooks()
}

function onUpdateBook(bookId, bookPrice) {
    updateBook(bookId, bookPrice)

    renderBooks()
}

function onAddBook() {
    const bookTitle = prompt('Enter a title:')
    const bookPrice = +prompt('Enter a price:')

    addBook(bookTitle, bookPrice)

    renderBooks()
}

function onReadBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    const elBookModal = document.querySelector('.book-modal')
    const elTitleSpan = elBookModal.querySelector('h2 span')
    const elEtcSpan = elBookModal.querySelector('h3 span')
    const elRatingSpan = elBookModal.querySelector('h4 span')

    elTitleSpan.innerText = book.title
    elEtcSpan.innerText = book.price
    elRatingSpan.innerText = drawStars(book.rating)

    elBookModal.classList.add('active')
}

function onSearchChange() {
    filterBooks(gBooks)
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

    if (gSuccessMsgTimeout) {
        clearTimeout(gSuccessMsgTimeout);
    }

    gSuccessMsgTimeout = setTimeout(() => {
        elSuccessMsg.style.display = 'none'
    }, 1500)
}

function updateStatistics() {
    const expensiveCount = gBooks.filter(book => book.price > 200).length
    const averageCount = gBooks.filter(book => book.price >= 80 && book.price <= 200).length
    const cheapCount = gBooks.filter(book => book.price < 80).length

    document.getElementById('expensiveCount').textContent = expensiveCount
    document.getElementById('averageCount').textContent = averageCount
    document.getElementById('cheapCount').textContent = cheapCount
}

function onCloseModal() {
    const elBookModal = document.querySelector('.book-modal')
    elBookModal.classList.remove('active')
}

//Book shop II

function onSortBooks(criteria) {
    // const elTitle = document.querySelector('.table-title')
    // const elPrice = document.querySelector('.table-price')
    // const elRating = document.querySelector('.table-rating')
    sortBooks(criteria)
    // if (criteria === 'title') {
    //     elTitle.innerText += ' +'
    // }
    // if (criteria === 'price') {
    //     elPrice.innerText += ' +'
    // }
    // if (criteria === 'rating') {
    //     elRating.innerText += ' +'
    // }

    renderBooks()
}

function onFilterBooks() {
    const title = document.querySelector('#searchInput').value.toLowerCase()
    const minRating = +document.querySelector('.minRating').value

    gQueryOptions.filterBy.txt = title
    gQueryOptions.filterBy.rating = minRating


    gFilteredBooks = filterBooks(gBooks)
    renderBooks()
}

function onClearFilter() {
    document.querySelector('#searchInput').value = ''
    document.querySelector('.minRating').value = '0'
    clearSearch()
    renderBooks()

}


function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.txt)
    queryParams.set('rating', gQueryOptions.filterBy.rating)

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    if (gQueryOptions.page) {
        queryParams.set('currentPage', gQueryOptions.page.currPage)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)

}

function getBooksForCurrPage() {
    const booksPerPage = gQueryOptions.page.size
    const startIdx = (gQueryOptions.page.currPage - 1) * booksPerPage
    const endIdx = startIdx + booksPerPage
    return gFilteredBooks.slice(startIdx, endIdx)
}

function onNextPage() {
    const totalPages = Math.ceil(gFilteredBooks.length / gQueryOptions.page.size)
    if (gQueryOptions.page.currPage < totalPages) {
        gQueryOptions.page.currPage++
    } else {
        gQueryOptions.page.currPage = 1;
    }
    renderBooks()
}

function onPrevPage() {
    const totalPages = Math.ceil(gFilteredBooks.length / gQueryOptions.page.size)
    if (gQueryOptions.page.currPage > 1) {
        gQueryOptions.page.currPage--
    } else {
        gQueryOptions.page.currPage = totalPages;
    }
    renderBooks()
}

