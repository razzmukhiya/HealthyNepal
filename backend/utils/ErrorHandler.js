class ErrorHandler extends Error {
    constructor(message, statusCode, data = null) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            data: this.data,
        };
    }
};

module.exports = ErrorHandler;