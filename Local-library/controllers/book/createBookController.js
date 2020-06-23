const Book = require('../../models/book');
const bookValidation = require('./bookValidation');
const { ValidationError } = require('../../shared');
const { validationResult } = require('express-validator');

const bookCreate = [
  bookValidation,

  (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.authorId,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genreId
    });

    if(!errors.isEmpty()) {
      const error = new ValidationError(errors);
      return next(error);
    }
    book.save()
      .then(result => {
        res.status(201).json({data: result});
      })
  }
];

module.exports = {
  bookCreate
};