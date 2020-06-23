const { bookList, bookDetail } = require('./getBookController');
const { bookCreate } = require('./createBookController');
const { bookUpdate } = require('./updateBookController');
const { bookDelete } = require('./deleteBookController');

module.exports = {
  bookList,
  bookDetail,
  bookCreate,
  bookUpdate,
  bookDelete
};
