const { bookinstanceList, bookinstanceDetail } = require('./getBookinstanceController');
const { bookinstanceCreate } = require('./createBookinstanceController');
const { bookinstanceUpdate } = require('./updateBookinstanceController');
const { bookinstanceDelete } = require('./deleteBookinstanceController');

module.exports = {
  bookinstanceList,
  bookinstanceDetail,
  bookinstanceCreate,
  bookinstanceUpdate,
  bookinstanceDelete
}