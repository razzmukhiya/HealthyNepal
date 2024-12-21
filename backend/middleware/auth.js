 const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");

// List of public routes that don't require authentication
const publicRoutes = [
    '/product/get-all-products',
    '/product/get-product',
    '/user/login-user',
    '/user/signup',
    '/user/token',
    '/shop/login-shop',
    '/shop/create-shop'
];

// Helper function to check if a route is public
const isPublicRoute = (path) => {
    return publicRoutes.some(route => path.includes(route));
};

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    try {
        // Skip authentication for public routes
        if (isPublicRoute(req.path)) {
            return next();
        }

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Please login to continue"
            });
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to continue"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Check if this is a seller token
        const seller = await Shop.findById(decoded.id);
        if (seller) {
            req.user = { id: decoded.id, role: 'seller' };
        } else {
            // If not a seller, treat as regular user
            req.user = { id: decoded.id, role: 'user' };
        }
        next();
    } catch (error) {
        // Skip authentication errors for public routes
        if (isPublicRoute(req.path)) {
            return next();
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired, please login again"
            });
        }
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    try {
        if (!req.user || !req.user.id || req.user.role !== 'seller') {
            return res.status(401).json({
                success: false,
                message: "Please login as a seller to continue"
            });
        }

        const seller = await Shop.findById(req.user.id);
        
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Seller not found"
            });
        }

        req.seller = seller;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error verifying seller status"
        });
    }
});
