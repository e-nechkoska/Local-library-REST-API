let express = require('express');
let router = express.Router();

let authorController = require('../controllers/author');
let bookController = require('../controllers/book');
let genreController = require('../controllers/genre');
let bookinstanceController = require('../controllers/bookinstance');

// BOOK ROUTES
// router.get('/', bookController.index);

// router.get('/books', bookController.bookList);
// router.get('/books/:id', bookController.bookDetail);
// router.post('/books/create', bookController.bookCreate);
// router.put('/books/:id/update', bookController.bookUpdate);
// router.delete('/books/:id/delete', bookController.bookDelete);

// // AUTHOR ROUTES
// router.get('/authors', authorController.authorList);
// router.get('/authors/:id', authorController.authorDetail);
// router.post('/authors/create', authorController.authorCreate);
// router.put('/authors/:id/update', authorController.authorUpdate);
// router.delete('/authors/:id/delete', authorController.authorDelete);

// GENRE ROUTES
router.get('/genres/:id', genreController.genreDetail);
router.get('/genres', genreController.genreList);
router.post('/genres', genreController.genreCreate);
// router.put('/genres/:id/update', genreController.genreUpdate);
// router.delete('/genres/:id/delete', genreController.genreDelete);

// BOOKINSTANCE ROUTES
// router.get('/bookinstances', bookinstanceController.bookinstanceList);
// router.get('/bookinstances/:id', bookinstanceController.bookinstanceDetail);
// router.post('/bookinstances/create', bookinstanceController.bookinstanceCreate);
// router.put('/bookinstances/:id/update', bookinstanceController.bookinstanceUpdate);
// router.delete('/bookinstances/:id/delete', bookinstanceController.bookinstanceDelete);

module.exports = router;