class GemmaServiceError extends Error {
  constructor(message, statusCode = 502) {
    super(message);
    this.name = 'GemmaServiceError';
    this.statusCode = statusCode;
  }
}

module.exports = GemmaServiceError;
