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
        elBookTable.innerHTML = '<p class="no-books-msg">No books found matching the filter criteria.</p>'
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

