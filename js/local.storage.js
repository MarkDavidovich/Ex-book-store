'use strict'

const BOOKS_KEY = 'books'

function _loadBooks() {

    let books = JSON.parse(localStorage.getItem(BOOKS_KEY))

    if (!books || books.length === 0) {
        books = [
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
        _saveBooks(books)
    }
    return books;
}

function _saveBooks(books) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
}