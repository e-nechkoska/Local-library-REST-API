const { genreList, genreDetail } = require('./getGenreController');
const { genreCreate } = require('./createGenreController');
const { genreUpdateGet, genreUpdatePost } = require('./updateGenreController');
const { genreDelete } = require('./deleteGenreController');

module.exports = {
  genreList,
  genreDetail,
  genreCreate,
  genreUpdateGet,
  genreUpdatePost,
  genreDelete
};