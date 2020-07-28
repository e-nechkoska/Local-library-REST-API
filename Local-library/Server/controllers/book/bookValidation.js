const { body } = require('express-validator');
const Author = require('../../models/author');
const Genre = require('../../models/genre');

const validateTitle = body('title', 'Title must not be empty and it should have at least 3 characters.')
  .trim()
  .isLength({min: 3})
  .escape();

const validateSummary = body('summary', 'Summary must not be empty.')
  .trim()
  .isLength({min: 1})
  .escape();

const validateISBN = body('isbn', 'ISBN must not be empty.')
  .trim()
  .isLength({min: 1})
  .escape();

const authorExists = body('authorId').custom(authorId => {
  return  Author.findById(authorId)
  .exec()
  .then(author => {
    if(author === null) {
      return Promise.reject('Author does not exist');
    }
  }).catch(error => next(error));
});

const genreExists = body('genreId').custom(genreId => {
  return Genre.findById(genreId)
  .exec()
  .then(author => {
    if(author === null) {
    return Promise.reject('Genre does not exist');
    }
  }).catch(error => next(error));
});

const bookValidation = [
  validateTitle,
  authorExists,
  validateSummary,
  validateISBN,
  genreExists
];

const partialBookValidation = bookValidation.map(validator => validator.optional());

module.exports = {
  bookValidation,
  partialBookValidation
};