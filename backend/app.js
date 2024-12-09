const express = require('express');
const ErrorHandler = require('./middleware/error');
const catchAsyncError = require('./middleware/catchAsyncError');
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

// Increase the limit for JSON and URL-encoded payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
app.use("/", express.static("uploads"));
app.use("/test", (req, res) => {
    res.send("Hello world!");
  });

const storage = multer.memoryStorage(); // or use diskStorage
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // Increase the file size limit to 50MB
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
const shop = require("./controller/shop");

// const multer = require('multer');

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);


app.use(catchAsyncError(ErrorHandler));


// it's for ErrorHandling
const errorHandlerInstance = new ErrorHandler();




module.exports = app;