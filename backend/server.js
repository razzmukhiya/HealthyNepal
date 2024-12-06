const { connect } = require("mongoose");
const app = require("./app");
const connectDatabase = require("./db/Database");
// const multer = require("multer");



// const cloudinary = require("cloudinary");
// const bodyParser = require("body-parser");


// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Configure Multer




  

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.error('Uncaught Exception:', err);
    console.log(`Shutting down the server for handling uncaught exception`);
})

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({ path: "backend/config/.env" });
}



//connect db
connectDatabase();



// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// })

const server = app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`

    );
});

//unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
    console.log(`Shutting down the server for  ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);
    
    server.close(() => {
        process.exit(1);
    });
});
