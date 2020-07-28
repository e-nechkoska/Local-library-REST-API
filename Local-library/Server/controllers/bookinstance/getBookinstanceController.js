const BookInstance = require('../../models/bookinstance');
const { compareStrings } = require('../../utils');
const { ResourceNotFoundError } = require('../../shared');

const bookinstanceList = (req, res, next) => {
  BookInstance.find()
    .populate('book')
    .exec()
    .then(bookinstances => {
      bookinstances.sort((first, second) => {
        return compareStrings(first.book.title, second.book.title);
      });
      res.status(200).json({data: bookinstances});
    }).catch(error => next(error));
};

const bookinstanceDetail = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate('book')
    .exec()
    .then(bookinstance => {
      if(bookinstance === null) {
        const error = ResourceNotFoundError('Bookinstance not found');
        return next(error);
      }
      res.status(200).json({data: bookinstance});
    }).catch(error => next(error));
};

module.exports = {
  bookinstanceList,
  bookinstanceDetail
};