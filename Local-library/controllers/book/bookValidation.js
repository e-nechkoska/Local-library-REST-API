const { body } = require('express-validator');
const Book = require('../../models/book');
const Author = require('../../models/author');
const { ValidationError } = require('../../shared');

const validateTitle = body('title', 'Title must not be empty and it should have at least 3 characters.')
  .trim()
  .isLength({min: 3})
  .escape();

const validateAuthor = body('authorId', 'Author must not be empty.')
  .trim()
  .isLength({min: 1})
  .escape();

const validateSummary = body('summary', 'Summary must not be empty.')
  .trim()
  .isLength({min: 1})
  .escape();

const validateISBN = body('isbn', 'ISBN must not be empty.')
  .trim()
  .isLength({min: 1})
  .escape();

const sanitizeGenre = body('genre.*').escape();

const authorExists = body('authorId').custom(authorId => {
  return  Author.findById(authorId)
  .exec()
  .then(author => {
    if(author === null) {
      return Promise.reject('Author does not exist');
    }
  })
});

const bookValidation = [
  validateTitle,
  validateAuthor,
  authorExists,
  validateSummary,
  validateISBN,
  sanitizeGenre
];

const partialBookValidation = bookValidation.map(validator => validator.optional());

module.exports = {
  bookValidation,
  partialBookValidation
};