const { authorList, authorDetail } = require('./getAuthorController');
const { authorCreate } = require('./createAuthorController');
const { authorUpdate } = require('./updateAuthorController');
const { authorDelete } = require('./deleteAuthorController');

module.exports = {
  authorList,
  authorDetail,
  authorCreate,
  authorUpdate,
  authorDelete
};
