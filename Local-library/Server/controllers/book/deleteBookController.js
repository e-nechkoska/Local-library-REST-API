const Book = require('../../models/book');
const BookInstance = require('../../models/bookinstance');
const { DeleteBookValidationError, ResourceNotFoundError } = require('../../shared');

const bookDelete = (req, res, next) => {
  BookInstance.find({'book': req.params.id})
    .exec()
    .then(bookinstances => {
      if(bookinstances.length > 0) {
        const error = new DeleteBookValidationError('Delete the following bookinstances before deleting this book: ', bookinstances);
        return Promise.reject(error);
      }
      return Book.findById(req.params.id).exec();
    }).then(foundBook => {
      if(foundBook === null) {
        const error = new ResourceNotFoundError('Book not found');
        return Promise.reject(error);
      }
      return Book.findByIdAndDelete(req.params.id).exec();
    }).then(() => {
      res.status(204).end();
    }).catch(error => next(error));
};

module.exports = {
  bookDelete
};