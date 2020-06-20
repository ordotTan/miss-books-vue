import { Utils } from './utils.service.js';
import axios from 'axios'

const BOOKS_RESULTS_KEY = 'books_results'

export default {
    queryGoogle
}

async function queryGoogle(inputSearchWord) {
    if (!inputSearchWord) return
    //For dev purposes - work with static results from the books API
    // var booksResults = await Utils.loadFromStorage(BOOKS_RESULTS_KEY)
    // if (booksResults) {
    //     console.log('from storage')
    //     return (Promise.resolve(booksResults))
    // }
    // console.log('from server')
    // For dev purposs
    // var searchResults = await axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=hobbit`)
    var searchResults = await axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${inputSearchWord}`)
    if (!searchResults.data.items) return;
    const formattedBooks = searchResults.data.items.map(book => _formatBook(book))
    Utils.storeToStorage(BOOKS_RESULTS_KEY, formattedBooks)
    return formattedBooks
}


function _formatBook(book) {
    let description = book.volumeInfo.description ? book.volumeInfo.description : 'No Description'
    let imgURL = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail :  "https://www.ac-knowledge.net/images/nocover.jpg"
    let isOnSale = Math.random()>0.5? true : false
    const currBook = {}
    currBook._id = book.id
    currBook.title = book.volumeInfo.title
    currBook.author = typeof(book.volumeInfo.authors)===Object? book.volumeInfo.authors[0] : book.volumeInfo.authors
    currBook.description = description
    currBook.pageCount = book.volumeInfo.pageCount
    currBook.publishDate = book.volumeInfo.publishedDate,
    currBook.reviews = []
    currBook.thumbnail = imgURL
    currBook.listPrice = { amount: Utils.getRandomIntInclusive(20, 200), currencyCode: 'ILS', isOnSale }
    return currBook
}