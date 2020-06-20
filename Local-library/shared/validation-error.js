
class ValidationError extends Error {
  constructor(errors) {
    super();
    this.validationErrors = errors;
    this.status = 406;
  }
}

module.exports = ValidationError;
