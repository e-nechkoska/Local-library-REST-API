const Genre = require('../../models/genre');
const { ValidationError, ResourceNotFoundError } = require('../../shared');
const { body, validationResult } = require('express-validator');

const genreUpdate = [
  body('name', 'Genre name must not be empty').trim().isLength({min: 1}).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    let genre = new Genre({
      name: req.body.name,
      _id: req.params.id
    });

    if(!errors.isEmpty()) {
      next(new ValidationError(errors));
    } else {
      Genre.findOneAndUpdate({_id: req.params.id}, genre)
        .exec()
        .then(foundGenre => {
          if(foundGenre === null) {
            const error = new ResourceNotFoundError('Genre not found');
            return Promise.reject(error);
          }
          return Genre.findById(req.params.id).exec();
        })
        .then(updatedGenre => res.status(200).json({data: updatedGenre}))
        .catch(error => next(error));
    }
  }
];

module.exports = {
  genreUpdate
};