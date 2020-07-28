const { body, check } = require('express-validator');
const statuses = require('../../models/statuses');
const Book = require('../../models/book');

const statusesNames = statuses.map(status => status.name);

const validateImprint = body('imprint', 'Imprint must be specified')
  .trim()
  .isLength({min: 1})
  .escape();

const validateDueBack = body('dueBack', 'Invalid date')
  .optional({checkFalsy: true})
  .isISO8601()
  .escape();

const validateStatus = check('status').isIn(statusesNames);

const bookExists = body('bookId').custom(bookId => {
  return Book.findById(bookId).exec()
  .then(book => {
    if(book === null) {
    return Promise.reject('Book does not exist');
    }
  }).catch(error => next(error));
});

const validateBookinstance = [
  bookExists,
  validateImprint,
  validateDueBack,
  validateStatus
];

module.exports = validateBookinstance;