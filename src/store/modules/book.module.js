import bookService from '../../services/book.service.js';

export default {
    state: {
        books: [],
        currBook: null,
        bookFilterBy: {
            searchStr: '',
            minPrice: '',
            maxPrice: ''
        }
    },
    getters: {
        books(state) {
            return state.books;
        },
        bookFilterBy(state) {
            return state.bookFilterBy;
        },
        booksToShow(state) {
            var books = state.books;
            var filter = state.bookFilterBy;
            if (!filter) return books;
            var booksToShow = [...books];
            booksToShow = booksToShow.filter(book => {
                return (
                    book.title.toLowerCase().includes(filter.searchStr.toLowerCase()) &&
                    (book.listPrice.amount < filter.maxPrice || filter.maxPrice === "")
                    &&
                    (book.listPrice.amount >= filter.minPrice || filter.minPrice === "" || book.listPrice.amount === "")
                );
            });

            return booksToShow;
        },
        reviewsToShow(state) {
            if (!state.currBook) return []
            return state.currBook.reviews
        }
    },
    mutations: {
        setBooks(state, { books }) {
            state.books = books;
        },
        removeBook(state, {id}) {
            var idx = state.books.findIndex(book => book._id === id);
            if (idx === -1) throw new Error('Somthing went wrong while deleting book');
            state.books.splice(idx,1);
        },
        saveBook(state, {book}) {
            var idx = state.books.findIndex(currBook => currBook._id === book._id);
            if (idx === -1) state.books.push(book);
            else state.books.splice(idx, 1, book);
        },
        setBook(state, {book}) {
            state.currBook = book;
        },
        setBookFilter(state, filterBy) {
            state.bookFilterBy = filterBy;
        },
    },
    actions: {
        async loadBooks(context, payload) {
            var books = await bookService.query();
            context.commit({ type: 'setBooks', books });
            return books;
        },
        async removeBook({commit}, {id}) {
            await bookService.remove(id);
            commit({type: 'removeBook', id});
        },
        async saveBook({commit}, {book}) {
            // const foundBook = await bookService.get(book._id)
            // if (foundBook && foundBook._id) return false
            // if (fromGoogle) delete book._id
            const savedBook = await bookService.save(book);
            commit({type: 'saveBook', book: savedBook});
            return savedBook
        },
        async getBookById({commit}, {id}) {
            const book = await bookService.get(id);
            commit({type: 'setBook', book});
            return book;
        },
        async addReview({commit}, {id,review}) {
            const updatedBook = await bookService.addReview(id,review);
            commit({type: 'saveBook', book: updatedBook});
            commit({type: 'setBook',  book: updatedBook});
        },
        async removeReview({commit}, {reviewId,bookId}) {
            const updatedBook = await bookService.removeReview(reviewId,bookId);
            commit({type: 'saveBook', book: updatedBook});
            commit({type: 'setBook',  book: updatedBook});
        }
    },
}