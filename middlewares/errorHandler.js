module.exports = function errorHandler(err, req, res, next) {
  console.log(err);
  const { statusCode = 500, message } = err;
  return res.status(statusCode).send({ message });
};
