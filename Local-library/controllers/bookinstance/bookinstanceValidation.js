const { body, check } = require('express-validator');
const statuses = require('../../models/statuses');

const statusesNames = statuses.map(status => status.name);

console.log(statusesNames);
const validateBook = body('bookId', 'Book must be specified')
  .trim()
  .isLength({min: 1})
  .escape();

const validateImprint = body('imprint', 'Imprint must be specified')
  .trim()
  .isLength({min: 1})
  .escape();

const validateDueBack = body('dueBack', 'Invalid date')
  .optional({checkFalsy: true})
  .isISO8601()
  .escape();

const validateStatus = check('status').isIn(statusesNames);

const validateBookinstance = [
  validateBook,
  validateImprint,
  validateDueBack,
  validateStatus
];

module.exports = validateBookinstance;