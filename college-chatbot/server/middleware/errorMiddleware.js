// Helpers for consistent error handling.

// Create an error that carries an HTTP status code.
function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// Wrap async route handlers so rejected promises reach the error handler (Express 4).
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// 404 for unknown routes.
function notFound(req, res, next) {
  next(httpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// Central error handler: always answers with { message }.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || "Something went wrong on the server.";

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(" ");
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format.";
  } else if (err.code === 11000) {
    status = 409;
    message = "That value already exists.";
  } else if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Your session has expired. Please log in again.";
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token. Please log in again.";
  } else if (err.type === "entity.parse.failed") {
    status = 400;
    message = "Request body is not valid JSON.";
  }

  if (status >= 500) console.error(err);
  // Never leak internals for unexpected server errors in production.
  if (status >= 500 && process.env.NODE_ENV === "production" && !err.status) {
    message = "Something went wrong on the server.";
  }
  res.status(status).json({ message });
}

module.exports = { httpError, asyncHandler, notFound, errorHandler };
