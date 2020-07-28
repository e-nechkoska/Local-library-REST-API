const Genre = require('../../models/genre');
const Book = require('../../models/book');

const genreList = function(req, res, next) {
  Genre.find()
  .sort({name: 1})
  .exec()
  .then(genreList => {
    res.status(200).json({data: genreList});
  }).catch(error => next(error));
};

const genreDetail = function(req, res, next) {
  const genreFindByIdPromise = Genre.findById(req.params.id).exec();
  const bookFindPromise = Book.find({'genre': req.params.id}).exec();

  Promise.all([genreFindByIdPromise, bookFindPromise])
  .then((results) => {
    const [genre, books] = results;
    if (genre === null) {
      let error = new Error('Genre not found');
      error.status = 404;
      return next(error)
    }
    res.status(200).json({data: genre});
  }).catch(error => next(error));
};

module.exports = {
  genreList,
  genreDetail
};