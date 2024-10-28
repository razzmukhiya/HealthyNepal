const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles:true}));


//CONFOG
if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

// it's for ErrorHandling
const errorHandlerInstance = new ErrorHandler();



module.exports = app;