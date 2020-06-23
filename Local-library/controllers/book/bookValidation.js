const { body } = require('express-validator');

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

const bookValidation = [
  validateTitle,
  validateAuthor,
  validateSummary,
  validateISBN
];

const partialBookValidation = bookValidation.map(validator => validator.optional());

module.exports = {
  bookValidation,
  partialBookValidation
};