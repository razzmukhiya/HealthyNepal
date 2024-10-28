const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,   
    }).then((data) => {
        console.log(`mongo connected with server: ${data.connection.host}`)
    })

}

module.exports = connectDatabase;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const url = process.env.DB_URL; 
//         await mongoose.connect(url, {
            
//         });
//         console.log("MongoDB connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//         process.exit(1); 
//     }
// };

// module.exports = connectDB;