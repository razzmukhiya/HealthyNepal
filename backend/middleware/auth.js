const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization header:", authHeader); // Debug log

    const token = authHeader && authHeader.split(' ')[1]; // Remove Bearer prefix

    if (!token) {
        console.log("No token provided in the request");
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    console.log("Received token:", token); // Debug log

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        console.log("User authenticated:", user); // Debug log
        next();
    } catch (err) {
        console.log("Error verifying token:", err); // Debug log
        if (err.name === 'TokenExpiredError') {
            console.log("Token expired");
            return res.status(401).json({ message: 'Token expired' });
        }
        console.log("Invalid token:", err);
        return res.status(403).json({ message: 'Invalid token' });
    }
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    console.log("isSeller middleware called");

    if (!req.user) {
        console.log("User not authenticated");
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User found:", user); // Debug log

        if (user.role !== 'seller') {
            console.log("User is not a seller");
            return res.status(403).json({ message: 'User is not a seller' });
        }

        req.seller = user;
        console.log("User is a seller:", user); // Debug log
        next();
    } catch (err) {
        console.log("Error in isSeller middleware:", err);
        return next(new ErrorHandler(err.message, 500));
    }
});
