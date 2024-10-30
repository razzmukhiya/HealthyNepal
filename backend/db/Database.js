// const mongoose = require('mongoose');

// const connectDatabase = async () => {
//     try {
//         await mongoose.connect(process.env.DB_URL, {
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true,
//         });
//         console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         process.exit(1);
//     }
// };

// module.exports = connectDatabase;

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;