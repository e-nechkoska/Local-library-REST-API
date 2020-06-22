const { genreList, genreDetail } = require('./getGenreController');
const { genreCreate } = require('./createGenreController');
const { genreUpdate } = require('./updateGenreController');
const { genreDelete } = require('./deleteGenreController');

module.exports = {
  genreList,
  genreDetail,
  genreCreate,
  genreUpdate,
  genreDelete
};