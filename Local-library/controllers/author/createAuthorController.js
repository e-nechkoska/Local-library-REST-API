const Author = require('../../models/author');
const validateAuthor = require('./authorValidation');
const { ValidationError } = require('../../shared');
const { validationResult } = require('express-validator');

const authorCreate = [
  validateAuthor,

  (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      firstName: req.body.firstName,
      familyName: req.body.familyName,
      dateOfBirth: req.body.dateOfBirth,
      dateOfDeath: req.body.dateOfDeath
    });

    if(!errors.isEmpty()) {
      const error = new ValidationError(errors);
      return next(error);
    }
    author.save()
      .then(createdAuthor => {
        res.status(201).json({data: createdAuthor});
      }).catch(error => next(error));
  }
];

module.exports = {
  authorCreate
};