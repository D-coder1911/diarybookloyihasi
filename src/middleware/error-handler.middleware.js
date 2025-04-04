export const ErrorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`Error: ${message}, StatusCode: ${statusCode}`);
  res.status(statusCode).json({ error: message });
};
