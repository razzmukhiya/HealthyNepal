const fs = require('fs');
const path = require('path');

// Create a write stream for logging errors
const logStream = fs.createWriteStream(path.join(__dirname, 'error.log'), { flags: 'a' });

// Function to log errors
function logError(message) {
    const timestamp = new Date().toISOString();
    logStream.write(`[${timestamp}] ${message}\n`);
}

module.exports = logError;
