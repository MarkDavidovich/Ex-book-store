'use strict'

const BOOKS_KEY = 'books'

function _loadBooks() {
    let books = JSON.parse(localStorage.getItem(BOOKS_KEY))
    _saveBooks(books)

    return books;
}

function _saveBooks(books) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books))
}