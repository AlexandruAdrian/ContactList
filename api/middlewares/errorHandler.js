const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(err.status || 500).json({
    error: err.message || "Internal server error!",
  });
};

module.exports = errorHandler;
