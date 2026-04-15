/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error('🔥 Error:', err.stack);

  // Mongoose/MySQL specific errors can be handled here
  // e.g. JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token. Please log in again.';
    res.status(401);
  }
  
  if (err.name === 'TokenExpiredError') {
    error.message = 'Your token has expired. Please log in again.';
    res.status(401);
  }

  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
    success: false,
    message: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

/**
 * 404 Not Found Middleware
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
