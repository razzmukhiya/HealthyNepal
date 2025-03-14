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

const app = express();

const corsOptions = {
    origin: true, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(morgan('combined', { stream: logger.stream }));

app.use((req, res, next) => {
    const startTime = Date.now();
    logAPIRequest(req);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const uploadsDir = path.join(__dirname, "../uploads");
const avatarsDir = path.join(uploadsDir, "avatars");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir);
}

app.use("/uploads", express.static(uploadsDir));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", express.static(path.join(__dirname, "../HealthyNepal/public/uploads")));

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    });
}

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get("/api/v2/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const admin = require("./controller/admin");
const order = require("./controller/order");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/admin", admin);
app.use("/api/v2/orders", order); 

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError' || err.message === 'No authentication token found') {
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

app.use(errorMiddleware);

module.exports = app;
