// Centralized error handler. Controllers call next(err) and everything
// lands here instead of duplicating try/catch response logic everywhere.
const errorMiddleware = (err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
};

module.exports = errorMiddleware;
