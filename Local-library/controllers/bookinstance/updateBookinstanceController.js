const BookInstance = require('../../models/bookinstance');
const validateBookinstance = require('./bookinstanceValidation');
const { ValidationError, ResourceNotFoundError } = require('../../shared');
const { validationResult } = require('express-validator');

const bookinstanceUpdate = [
  validateBookinstance,

  (req, res, next) => {
    const errors = validationResult(req);

    const bookinstance = new BookInstance({
      book: req.body.bookId,
      imprint: req.body.imprint,
      status: req.body.status,
      dueBack: req.body.dueBack,
      _id: req.params.id
    });

    if(!errors.isEmpty()) {
      const error = new ValidationError(errors);
      return next(error);
    }
    BookInstance.findOneAndUpdate({_id: req.params.id}, bookinstance)
      .exec()
      .then(foundBookinstance => {
        if(foundBookinstance === null) {
          const error = new ResourceNotFoundError('Bookinstance not found');
          return Promise.reject(error);
        } 
        return BookInstance.findById(req.params.id).populate('book').exec();
      })
      .then(updatedBookinstance => {
        res.status(200).json({data: updatedBookinstance});
      })
      .catch(error => next(error));
  }
];

module.exports = {
  bookinstanceUpdate
};