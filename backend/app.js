const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())
// app.use(cors());
app.use("/", express.static("uploads"));
app.use("/test", (req, res) => {
    res.send("Hello world!");
  });
  
app.use(bodyParser.urlencoded({extended: true, limit: "50mb" }));




//CONFOG
if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

//import routes
const user = require("./controller/user");

app.use("/api/v2/user", user);



// it's for ErrorHandling
const errorHandlerInstance = new ErrorHandler();




module.exports = app;