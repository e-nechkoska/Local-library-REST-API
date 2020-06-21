class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 406;
  }
}

module.exports = ForbiddenError;
