const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

const connectDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('DB URL:', process.env.DB_URL ? 'URL exists' : 'URL missing');

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      autoIndex: process.env.NODE_ENV !== "production"
    };

    const conn = await mongoose.connect(process.env.DB_URL, options);
    console.log(`MongoDB connected with ${conn.connection.host}`);
    logger.info('MongoDB connected successfully', {
      host: conn.connection.host,
      name: conn.connection.name
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      logger.error('MongoDB connection error', { error: err.message, stack: err.stack });
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected');
      logger.info('MongoDB connection established');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      logger.warn('MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
      }
    });

    if (process.env.NODE_ENV !== "production") {
      mongoose.set('debug', true);
    }

    const checkConnection = async () => {
      if (mongoose.connection.readyState !== 1) {
        console.log('MongoDB connection lost, attempting to reconnect...');
        try {
          await mongoose.connect(process.env.DB_URL, options);
          console.log('MongoDB reconnected successfully');
        } catch (err) {
          console.error('Error reconnecting to MongoDB:', err);
        }
      }
    };

    setInterval(checkConnection, 30000);

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
