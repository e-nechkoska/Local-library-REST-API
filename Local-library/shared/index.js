const ValidationError = require('./validation-error');
const AlreadyExistsError = require('./already-exists-error');
const DeleteGenreValidationError = require('./delete-genre-validation-error');
const ResourceNotFoundError = require('./resource-not-found-error');

module.exports = {
  ValidationError,
  AlreadyExistsError,
  DeleteGenreValidationError,
  ResourceNotFoundError
};