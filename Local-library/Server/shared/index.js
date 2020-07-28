const ValidationError = require('./validation-error');
const AlreadyExistsError = require('./already-exists-error');
const DeleteGenreValidationError = require('./delete-genre-validation-error');
const ResourceNotFoundError = require('./resource-not-found-error');
const DeleteAuthorValidationError = require('./delete-author-validation-error');
const DeleteBookValidationError = require('./delete-book-validation-error');

module.exports = {
  ValidationError,
  AlreadyExistsError,
  DeleteGenreValidationError,
  ResourceNotFoundError,
  DeleteAuthorValidationError,
  DeleteBookValidationError
};