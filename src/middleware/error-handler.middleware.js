const ErrorHandlerMiddleware = (err, req, res, next) => {
  console.error(`[ERROR]: ${err.message}`);
  
  const statusCode = err.status || 500; 
  const errorType = err.name || 'ServerError'; 
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Serverda kutilmagan xatolik yuz berdi!',
    errorType,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, 
  });
};

export default ErrorHandlerMiddleware;
