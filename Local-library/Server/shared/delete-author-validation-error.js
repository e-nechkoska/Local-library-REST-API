class DeleteAuthorValidationError extends Error {
  constructor(message, books) {
    super(message);
    this.status = 406;
    this.books = books;
  }
}

module.exports = DeleteAuthorValidationError;