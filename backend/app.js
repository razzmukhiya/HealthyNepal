const express = require('express');
const ErrorHandler = require('./utils/ErrorHandler');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { logger, logAPIRequest } = require('./utils/logger');
const morgan = require('morgan');

// Initialize express app
const app = express();

// CORS configuration
const corsOptions = {
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Enable CORS with the options
app.use(cors(corsOptions));

// Request logging middleware
app.use(morgan('combined', { stream: logger.stream }));

// Log all requests
app.use((req, res, next) => {
    const startTime = Date.now();
    logAPIRequest(req);

    // Log response time after request is completed
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.info({
            type: 'request-completed',
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`
        });
    });
    next();
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Ensure uploads directories exist
const uploadsDir = path.join(__dirname, "../uploads");
const avatarsDir = path.join(uploadsDir, "avatars");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir);
}

// Serve static files from uploads directory
app.use("/uploads", express.static(uploadsDir));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", express.static(path.join(__dirname, "../HealthyNepal/public/uploads")));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    });
}

// Handle favicon.ico requests early
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Health check endpoint
app.get("/api/v2/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

// Import routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const admin = require("./controller/admin");

// Use routes
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/admin", admin);

// Global error handler for authentication errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError' || err.message === 'No authentication token found') {
        // For public routes that don't require authentication
        if (req.path.includes('/product/get-all-products') || 
            req.path.includes('/product/get-product/')) {
            return next();
        }
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }
    next(err);
});

// Handle 404 errors for API routes
app.use('/api', (req, res, next) => {
    logger.warn({
        type: '404-error',
        url: req.originalUrl,
        method: req.method
    });
    const error = new Error(`API route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
});

// Handle 404 for other routes
app.use((req, res, next) => {
    logger.warn({
        type: '404-error',
        url: req.originalUrl,
        method: req.method
    });
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
});

// Error handling middleware for file cleanup
app.use((err, req, res, next) => {
    if (req.files) {
        for (const file of req.files) {
            try {
                fs.unlinkSync(file.path);
            } catch (error) {
                logger.error('Error deleting file:', {
                    error: error.message,
                    file: file.path
                });
            }
        }
    }
    next(err);
});

// Log all errors
app.use((err, req, res, next) => {
    logger.error({
        type: 'error',
        error: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params
    });
    next(err);
});

// Final error handling middleware
app.use(errorMiddleware);

module.exports = app;
