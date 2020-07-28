const Author = require('../../models/author');
const validateAuthor = require('./authorValidation');
const { ValidationError, ResourceNotFoundError } = require('../../shared');
const { validationResult } = require('express-validator');

const authorUpdate = [
  validateAuthor,

  (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath,
      _id: req.params.id
    });

    if(!errors.isEmpty()) {
      const error = new ValidationError(errors);
      return next(error);
    }
    Author.findByIdAndUpdate(req.params.id, author)
      .exec()
      .then(foundAuthor => {
        if(foundAuthor === null) {
          const error = new ResourceNotFoundError('Author not found');
          return Promise.reject(error);
        }
        return Author.findById(req.params.id).exec();
      }).then(updatedAuthor => {
        res.status(200).json({data: updatedAuthor});
      }).catch(error => next(error));
  }
];

module.exports = {
  authorUpdate
};