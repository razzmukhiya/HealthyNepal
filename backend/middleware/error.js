const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server Error"

    //wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid :${err.path} :${err.value}`
        err = new ErrorHandler(message,400);
    }

    //Duplicate key error 
    if(err.code ===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
    }

    // wrong jwt error 
    if(err.name === "JsonWebTokenError"){
        const message = "Json web token is invalid, please log in again";
        err = new ErrorHandler(message,400);
    }

    // jwt expired
    if(err.name === "TokenExpiredError"){
        const message = "Json web token has expired, please log in again";
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json ({
        success: false,
        message: err.message,
    })
}