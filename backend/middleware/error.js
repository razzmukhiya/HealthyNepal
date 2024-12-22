const ErrorHandler = require("../utils/ErrorHandler");
const { logger, logError } = require("../utils/logger");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error";

  // Log error with our logging utility
  logError(err, {
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    err = new ErrorHandler("File size is too large! Maximum size is 5MB", 400);
  }

  // Multer file type error
  if (err.message === 'Not an image! Please upload only images.') {
    err = new ErrorHandler(err.message, 400);
  }

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Your URL is invalid. Please try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Your URL has expired. Please try again`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(value => value.message);
    err = new ErrorHandler(message[0], 400);
  }

  // Clean up uploaded files if there's an error
  if (req.files) {
    const fs = require('fs');
    req.files.forEach(file => {
      try {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    });
  }

  const response = {
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...(err.data && { data: err.data })
  };

  // Log the error response
  logger.error('Error response:', response);

  res.status(err.statusCode).json(response);
};
