const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: true, limit: "50mb" }));




//CONFOG
if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

//import routes
const user = require("./controller/user");



// it's for ErrorHandling
const errorHandlerInstance = new ErrorHandler();



module.exports = app;