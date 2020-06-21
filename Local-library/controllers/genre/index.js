const { genreList, genreDetail } = require('./getGenreController');
const { genreCreate } = require('./createGenreController');
const { genreUpdateGet, genreUpdatePost } = require('./updateGenreController');
const { genreDeleteGet, genreDeletePost } = require('./deleteGenreController');

module.exports = {
  genreList,
  genreDetail,
  genreCreate,
  genreUpdateGet,
  genreUpdatePost,
  genreDeleteGet,
  genreDeletePost
};