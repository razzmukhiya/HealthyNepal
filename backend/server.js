const app = require("./app");
const connectDatabase = require("./db/Database");
const fs = require('fs'); 
const logError = require('./utils/logger'); // Import the logging utility
const path = require('path');

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
    try {
        require("dotenv").config({ path: "backend/config/.env" });
        console.log('Environment variables loaded');
        console.log('Environment:', {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            DB_URL: process.env.DB_URL ? 'DB_URL exists' : 'DB_URL missing'
        });
    } catch (error) {
        console.error('Error loading environment variables:', error);
        process.exit(1);
    }
}

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to database
connectDatabase();

// Start server
const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 8000}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    
    server.close(() => {
        process.exit(1);
    });
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});
