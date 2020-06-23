const { bookList, bookDetail } = require('./getBookController');
const { bookCreate } = require('./createBookController');
const { bookUpdate, partialBookUpdate } = require('./updateBookController');
const { bookDelete } = require('./deleteBookController');

module.exports = {
  bookList,
  bookDetail,
  bookCreate,
  bookUpdate,
  partialBookUpdate,
  bookDelete
};
