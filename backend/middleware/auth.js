const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");


exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    // const {token} = req.cookies;
    // // token = req.headers['authorization'];

    // if(!token){
    //     return next(new ErrorHandler("Please login to continue", 401));
    //     // return res.sendStatus(401);
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // req.user = await User.findById(decoded.id);

    // next();

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Remove Bearer prefix

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
});

