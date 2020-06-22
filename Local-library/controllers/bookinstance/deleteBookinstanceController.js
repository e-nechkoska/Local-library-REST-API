const BookInstance = require('../../models/bookinstance');
const { ResourceNotFoundError } = require('../../shared');

const bookinstanceDelete = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .exec()
    .then(bookinstance => {
      if(bookinstance === null) {
        const error = ResourceNotFoundError('Bookinstance not found');
        return Promise.reject(error);
      }
      return BookInstance.findByIdAndRemove(req.params.id).exec();
    })
    .then(() => {
      res.status(204).end(); 
    })
    .catch(error => next(error));
};

module.exports = {
  bookinstanceDelete
};