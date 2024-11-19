const express = require("express");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require('../model/user');
const  isAuthenticated  = require("../middleware/auth");
const sendToken = require("../utils/jwtToken");

// Create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User  already exists", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    
    const newUser  = await User.create(user);
    
    // Respond with success message and user information
    res.status(201).json({
      success: true,
      user: {
        id: newUser ._id,
        name: newUser .name,
        email: newUser .email,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Login user
router.post("/login-user", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide both email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User  doesn't exist!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Invalid password", 400));
    }

    // Respond with success message and user information
    // res.status(200).json({
    //   success: true,
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //   },
    // });
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

//load user
router.get("/getuser", isAuthenticated , catchAsyncErrors(async(req,res,next) => {
  try {
    const user = await User.findById(req.user.id);

    if(!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    const callback = (userData) => {
      console.log("User Data retrieved", userData);

    };

    callback(user);

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;
