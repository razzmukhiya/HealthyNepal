// const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("./catchAsyncError");
// const jwt = require("jsonwebtoken");
// const User = require("../model/user");


// // const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
// //     const token = req.cookies.token;

// //     if (!token) {
// //         return next(new ErrorHandler("Please login to continue", 401));
// //     }

// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
// //         req.user = await User.findById(decoded.id);
// //         next();
// //     } catch (error) {
// //         return next(new ErrorHandler("Invalid token", 401));
// //     }
// // });

// // module.exports = isAuthenticated;


// // const isAuthenticated = catchAsyncErrors(async(req,res,next) => {
// //     const token = req.cookies;

// //     if(!token){
// //         return next(new ErrorHandler("Please login to continue", 401));
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

// //     req.user = await User.findById(decoded.id);

// //     next();
// //     console.log(token);
// // });


// // module.exports = isAuthenticated;



// const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//     // Extract the token from the Authorization header
//     token = req.headers['authorization']?.split(' ')[1];

//     // Check if the token is present and is a string
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     try {
//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret in env
//         req.user = decoded; // Attach the decoded user information to the request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         // Handle the error if the token is invalid
//         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
// });

// module.exports = isAuthenticated;


const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    // Check if the token is present
    if (!token) {
        return next(new ErrorHandler("Unauthorized: No token provided", 401));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have your secret in env
        req.user = await User.findById(decoded.id); // Attach the user information to the request object
        if (!req.user) {
            return next(new ErrorHandler("Unauthorized: User not found", 401));
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Handle the error if the token is invalid
        return next(new ErrorHandler("Unauthorized: Invalid token", 401));
    }
});

module.exports = isAuthenticated;

// exports.isSeller = catchAsyncErrors(async(req,res,next) => {
//     const {seller_token} = req.cookies;
//     if(!seller_token){
//         return next(new ErrorHandler("Please login to continue", 401));
//     }

//     const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

//     req.seller = await Shop.findById(decoded.id);

//     next();
// });


// exports.isAdmin = (...roles) => {
//     return (req,res,next) => {
//         if(!roles.includes(req.user.role)){
//             return next(new ErrorHandler(`${req.user.role} can not access this resources!`))
//         };
//         next();
//     }
// }