const BookInstance = require('../../models/bookinstance');
const validateBookinstance = require('./bookinstanceValidation');
const { ValidationError } = require('../../shared');
const { validationResult } = require('express-validator');

const bookinstanceCreate = [
  validateBookinstance,

  (req, res, next) => {
    const errors = validationResult(req);

    const bookinstance = new BookInstance({
      book: req.body.bookId,
      imprint: req.body.imprint,
      status: req.body.status,
      dueBack: req.body.dueBack
    });

    if(!errors.isEmpty()) {
      const error = new ValidationError(errors);
      return next(error);
    }
    bookinstance.save()
      .then(result => {
        res.status(201).json({data: result});
      }).catch(error => next(error));
  }
];

module.exports = {
  bookinstanceCreate
};