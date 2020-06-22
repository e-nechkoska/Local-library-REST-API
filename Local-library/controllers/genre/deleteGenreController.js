const Genre = require('../../models/genre');
const Book = require('../../models/book');
const { ForbiddenError } = require('../../shared');

// const renderDeleteGenre = (res, genre, books) => {
//   res.render('genre_delete', {
//     title: 'Delete Genre',
//     genre: genre,
//     books: books,
//   });
// };

// const genreDeleteGet = function(req, res, next) {
//   const genreFindByIdPromise = Genre.findById(req.params.id).exec();
//   const bookFindPromise = Book.find({'genre': req.params.id}).exec();

//   Promise.all([genreFindByIdPromise, bookFindPromise])
//   .then((results) => {
//     const [genre, books] = results;
//     if(genre === null) {
//       res.redirect('/catalog/genres')
//     }
//     renderDeleteGenre(res, genre, books);
//   }).catch(error => next(error));
// };

// const genreDeletePost = function(req, res, next) {
//   const genreFindByIdPromise = Genre.findById(req.body.genreid).exec();
//   const bookFindPromise = Book.find({'genre': req.body.genreid}).exec();

//   Promise.all([genreFindByIdPromise, bookFindPromise])
//   .then((results) => {
//     const [genre, books] = results;
//     if(books.length > 0) {
//       renderDeleteGenre(res, genre, books);
//     } else {
//       Genre.findByIdAndRemove(req.body.genreid).exec()
//       .then(() => {
//         res.redirect('/catalog/genres');
//       }).catch(error => next(error));
//     }
//   }).catch(error => next(error));
// };

const genreDelete = (req, res, next) => {
  console.log('hello');
  // promiseAll book and genre then error if there are books and delete if there are not
  const genreFindByIdPromise = Genre.findById(req.params.id).exec();
  const bookFindPromise = Book.find({'genre': req.params.id}).exec();

  Promise.all([genreFindByIdPromise, bookFindPromise])
  .then(results => {
    const [genre, books] = results;
    if(books.length > 0) {
      console.log(1);
      const error = new ForbiddenError('Delete books before deleting the genre');
      next(error);
    } else {
      genre.remove()
      .exec()
      .then(() => {
        console.log(2);
        res.status(204).end();
      })      
    }
  }).catch(error => next(error));
  // .exec()
  // .then(books => {
  //   if(books.length > 0) {
  //     const error = new ForbiddenError('Delete books before deleting the genre');

  //   }
  // })

}

module.exports = {
  genreDelete
};