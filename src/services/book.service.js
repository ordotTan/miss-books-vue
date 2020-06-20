'use strict';

import { DbService } from './db-service.js';
import { Utils } from './utils.service.js';

const KEY = 'books';


export default {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    removeReview,
    getNextPrevBooks
}

async function query() {
    var books = await DbService.query(KEY);
    if (!books || !books.length) {
        books = _createDefaultBooks();
        await DbService.insert(KEY, books);
    }
    return books;
}

function get(id) {
    if (!id) return Promise.resolve(getEmptyBook());
    return DbService.get(KEY, id);
}

function remove(id) {
    return DbService.delete(KEY, id);
}

function save(book) {
    if (book._id) return DbService.put(KEY, book);
    else return DbService.post(KEY, book)
}

async function addReview(id, review) {
    let book = await get(id)
    review._id = Utils.getRandomId();
    book.reviews.push(review)
    return DbService.put(KEY, book);
}

async function removeReview(reviewId, bookId) {
    let book = await get(bookId)
    let idToRemove = book.reviews.findIndex(review => review._id === reviewId)
    book.reviews.splice(idToRemove, 1)
    return DbService.put(KEY, book);
}


function getEmptyBook() {
    return {
        title: '',
        subtitle: '',
        author:'',
        publishDate: '',
        description: '',
        pageCount: '',
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: {},
        reviews: []
    }
}

async function getNextPrevBooks(bookId) {
    let books = await DbService.query(KEY);
    if (books.length === 1) // There is only single book...
      return Promise.resolve({
        nextId: null,
        prevId: null,
      })

    const bookIdx = books.findIndex(book => book._id === bookId)
  
    if (bookIdx === 0)  // current book is in first position of the array
      return Promise.resolve({
        nextId: books[1]._id,
        prevId: books[books.length - 1]._id
      })
  
  
    else if (bookIdx === books.length - 1) // current book is in last position of the array
      return Promise.resolve({
        nextId: books[0]._id,
        prevId: books[books.length - 2]._id
      })
  
    else // All other positions
      return Promise.resolve({
        nextId: books[bookIdx + 1]._id,
        prevId: books[bookIdx - 1]._id
      })
  }


function _createDefaultBooks() {
    return [
        _createBook('Harry Potter', 15, true, 200, Date.now() - 380 * 24 * 60 * 60 * 1000, 'ILS', [],'J.K Rolling'),
        _createBook('Star Wars', 73, false, 500, Date.now() - 30 * 24 * 60 * 60 * 1000, 'ILS', [],'Steven Shpielberg'),
        _createBook('Aladdin', 300, true, 20, Date.now() - 10 * 365 * 24 * 60 * 60 * 1000, 'USD', [],'Wasim abu-Achmar')
    ];
}


function _createBook(title, price, isOnSale, pageCount, publishDate, currencyCode, reviews,author) {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    const listPrice = {
        amount: price,
        isOnSale,
        currencyCode
    }
    return {
        title,
        listPrice,
        pageCount,
        publishDate,
        description: lorem,
        reviews,
        author,
        thumbnail: "https://www.ac-knowledge.net/images/nocover.jpg"
    }
}