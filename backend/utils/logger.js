const winston = require('winston');
const path = require('path');

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  defaultMeta: { service: 'healthy-nepal-api' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({ 
      filename: path.join(__dirname, 'error.log'), 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs with level 'info' and below to combined.log
    new winston.transports.File({ 
      filename: path.join(__dirname, 'combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

// If we're not in production, log to the console with custom format
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}] : ${message} `;
        if (Object.keys(metadata).length > 0 && metadata.service) {
          msg += JSON.stringify(metadata);
        }
        return msg;
      })
    )
  }));
}

// Create a stream object for Morgan middleware
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

// Helper functions for common logging patterns
const logError = (error, additionalInfo = {}) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    ...additionalInfo
  });
};

const logAPIRequest = (req, additionalInfo = {}) => {
  logger.info({
    method: req.method,
    url: req.url,
    params: req.params,
    query: req.query,
    body: req.body,
    ip: req.ip,
    ...additionalInfo
  });
};

const logDBQuery = (operation, collection, query, duration) => {
  logger.debug({
    type: 'database',
    operation,
    collection,
    query,
    duration: `${duration}ms`
  });
};

const logPerformance = (action, duration, additionalInfo = {}) => {
  logger.info({
    type: 'performance',
    action,
    duration: `${duration}ms`,
    ...additionalInfo
  });
};

module.exports = {
  logger,
  logError,
  logAPIRequest,
  logDBQuery,
  logPerformance
};
