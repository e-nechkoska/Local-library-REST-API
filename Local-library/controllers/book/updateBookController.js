const Book = require('../../models/book');
const bookValidation = require('./bookValidation');
const { ValidationError, ResourceNotFoundError } = require('../../shared');
const { validationResult } = require('express-validator');

const bookUpdate = [
  bookValidation,

  (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.authorId,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genreId,
      _id: req.params.id
    });

    if(!errors.isEmpty()) {
      const error = new ValidationError(errors);
      return next(error);
    }
    Book.findByIdAndUpdate(req.params.id, book)
      .exec()
      .then(foundBook => {
        if(foundBook === null) {
          const error = new ResourceNotFoundError('Book not found');
          return Promise.reject(error);
        }
        return Book.findById(req.params.id).exec();
      }).then(updatedBook => {
        res.status(200).json({data: updatedBook});
      }).catch(error => next(error));
  }
];

module.exports = {
  bookUpdate
};