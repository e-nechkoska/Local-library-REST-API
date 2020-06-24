const BookInstance = require('../../models/bookinstance');
const validateBookinstance = require('./bookinstanceValidation');
const { ValidationError, ResourceNotFoundError } = require('../../shared');
const { validationResult } = require('express-validator');

// const renderBookinstanceForm = (res, bookinstance, books, statuses, errors = null) => {
//   res.render('bookinstance_form', {
//     title: 'Update BookInstance',
//     bookinstance: bookinstance,
//     bookList: books,
//     statuses: statuses,
//     errors: errors
//   });
// };

// const bookinstanceUpdateGet = function(req, res, next) {
//   const bookInstanceFindByIdPromise = BookInstance.findById(req.params.id).exec();
//   const bookFindPromise = Book.find().exec();

//   Promise.all([bookInstanceFindByIdPromise, bookFindPromise])
//   .then((results) => {
//     const [bookinstance, books] = results;
//     if(bookinstance === null) {
//       let error = new Error('Bookinstance not found');
//       error.status = 404;
//       return next(error);
//     }
//     const selectedStatus = bookinstance.status;
//     const bookInstanceStatuses = statuses.map(status => {
//       return {
//         ...status,
//         selected: selectedStatus === status.name
//       };
//     });
//     renderBookinstanceForm(res, bookinstance, books, bookInstanceStatuses);
//   }).catch(error => next(error));
// };

// const updateBookinstaceMiddleware = (req, res, next) => {
//   const errors = validationResult(req);

//   let bookinstance = new BookInstance({
//     book: req.body.book,
//     imprint: req.body.imprint,
//     status: req.body.status,
//     dueBack: req.body.dueBack,
//     _id: req.params.id
//   });

//   if(!errors.isEmpty()) {
//     Book.find({}, 'title')
//     .exec()
//     .then(books => {
//       renderBookinstanceForm(res, bookinstance, books, statuses, errors.array());
//     }).catch(error => next(error));
//   } else {
//     BookInstance.findByIdAndUpdate(req.params.id, bookinstance)
//     .exec()
//     .then(updatedBookinstance => {
//       res.redirect(updatedBookinstance.url);
//     }).catch(error => next(error));
//   }
// };

// const bookinstanceUpdatePost = [
//   validateBookinstance,
//   updateBookinstaceMiddleware  
// ];

const bookinstanceUpdate = [
  validateBookinstance,

  (req, res, next) => {
    const errors = validationResult(req);

    const bookinstance = new BookInstance({
      book: req.body.bookId,
      imprint: req.body.imprint,
      status: req.body.status,
      dueBack: req.body.dueBack,
      _id: req.params.id
    });

    if(!errors.isEmpty()) {
      const error = new ValidationError(errors);
      return next(error);
    }
    BookInstance.findOneAndUpdate({_id: req.params.id}, bookinstance)
      .exec()
      .then(foundBookinstance => {
        if(foundBookinstance === null) {
          const error = new ResourceNotFoundError('Bookinstance not found');
          return Promise.reject(error);
        } 
        return BookInstance.findById(req.params.id).populate('book').exec();
      })
      .then(updatedBookinstance => {
        res.status(200).json({data: updatedBookinstance});
      })
      .catch(error => next(error));
  }
];

module.exports = {
  bookinstanceUpdate
};