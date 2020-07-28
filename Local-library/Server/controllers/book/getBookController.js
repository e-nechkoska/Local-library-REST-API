const Book = require('../../models/book');
const { ResourceNotFoundError } = require('../../shared');

const bookList = (req, res, next) => {
  Book.find()
    .sort({'title': 1})
    .populate('author')
    .populate('genre')
    .exec()
    .then(books => {
      res.status(200).json({data: books});
    }).catch(error => next(error));
};

const bookDetail = (req, res, next) => {
  Book.findById(req.params.id)
    .populate('author')
    .populate('genre')
    .exec()
    .then(book => {
      if(book === null) {
        const error = new ResourceNotFoundError('Book not found');
        return next(error);
      }
      res.status(200).json({data: book});
    }).catch(error => next(error));
};

module.exports = {
  bookList,
  bookDetail
};