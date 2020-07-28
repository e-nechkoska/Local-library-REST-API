const Genre = require('../../models/genre');
const { AlreadyExistsError, ValidationError } = require('../../shared');

const { body, validationResult } = require('express-validator');

const genreCreate = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const genre = new Genre({
      name: req.body.name
    });

    if(!errors.isEmpty()) {
      next(new ValidationError(errors));
    } else {
      Genre.findOne({name: req.body.name})
      .exec()
      .then(genreExists => {
        if(genreExists) {
          const error = new AlreadyExistsError('Genre already exists!');
          next(error);
        } else {
          genre.save();
          res.status(201).json({data: genre});
        }        
      }).catch(error => next(error));
    }
  }
];

module.exports = {
  genreCreate
};