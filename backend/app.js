const express = require('express');
const ErrorHandler = require('./middleware/error');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const SecretKey="SecretKey";
const { json, urlencoded } = require('express');
const multer = require("multer");

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



  app.use(bodyParser.json({ limit: '100mb' })); // Set limit to 10MB or adjust as needed
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); // Adjust as needed



const storage = multer.memoryStorage(); // or use diskStorage
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
  });

  app.post('/upload', upload.single('file'), (req, res) => {
    // Handle successful upload
    res.send('File uploaded successfully');
}, (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).send(error.message);
    }
    res.status(500).send('An unknown error occurred');
});


//CONFOG
if (process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/.env"
    })
}

//import routes
const user = require("./controller/user");
const catchAsyncError = require('./middleware/catchAsyncError');
// const multer = require('multer');

app.use("/api/v2/user", user);


app.use(catchAsyncError(ErrorHandler));


// it's for ErrorHandling
const errorHandlerInstance = new ErrorHandler();




module.exports = app;