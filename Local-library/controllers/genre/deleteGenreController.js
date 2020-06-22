const Genre = require('../../models/genre');
const Book = require('../../models/book');
const { DeleteGenreValidationError } = require('../../shared');

const genreDelete = (req, res, next) => {
  const genreFindByIdPromise = Genre.findById(req.params.id).exec();
  const bookFindPromise = Book.find({'genre': req.params.id}).exec();

  Promise.all([genreFindByIdPromise, bookFindPromise])
  .then(results => {
    const [genre, books] = results;
    if(books.length > 0) {
      const error = new DeleteGenreValidationError('Delete the following books before deleting the genre:', books);
      next(error);
    } else {
      Genre.findOneAndDelete({_id: req.params.id})
      .exec()
      .then(() => {
        res.status(204).end();
      })      
    }
  }).catch(error => next(error));
};

module.exports = {
  genreDelete
};