class DeleteBookValidationError extends Error {
  constructor(message, bookinstances) {
    super(message);
    this.status = 406;
    this.bookinstances = bookinstances;
  }
}

module.exports = DeleteBookValidationError;