const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const index = (req, res, next) => {   
    const bookCountPromise = Book.countDocuments();
    const bookInscanceCountPromise = BookInstance.countDocuments();
    const bookInscanceAvailableCountPromise = BookInstance.countDocuments({status: 'Available'});
    const authorCountPromise = Author.countDocuments();
    const genreCountPromise = Genre.countDocuments();

    Promise.all([bookCountPromise, bookInscanceCountPromise, bookInscanceAvailableCountPromise, authorCountPromise, genreCountPromise])
    .then((results) => {
      const [books, bookInstances, availableBookInstances, authors, genres] = results;
      res.status(200).json({data: {books: books, bookinstance: bookInstances, availableBookInstances: availableBookInstances, authors: authors, genres: genres}});
    }).catch(error => res.render('index', {error: error}));
};

module.exports = {
  index
};