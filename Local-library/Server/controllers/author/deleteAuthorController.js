const Author = require('../../models/author');
const Book = require('../../models/book');
const { DeleteAuthorValidationError, ResourceNotFoundError } = require('../../shared');

const authorDelete = (req, res, next) => {
  const authorFindByIdPromise = Author.findById(req.params.id).exec();
  const booksFindPromise = Book.find({author: req.params.id}).exec();

  Promise.all([authorFindByIdPromise, booksFindPromise])
    .then(results => {
      const [author, books] = results;
      if(author === null) {
        const error = new ResourceNotFoundError('Author not found');
        return next(error);
      }
      if(books.length > 0) {
        const error = new DeleteAuthorValidationError('Delete the following books before deleting this author: ', books);
        return Promise.reject(error);
      }
      return Author.findByIdAndDelete(req.params.id).exec();  
    }).then(() => {
      res.status(204).end();
    }).catch(error => next(error));
};

module.exports = {
  authorDelete
};