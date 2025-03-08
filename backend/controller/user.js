const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../model/user");
const { isAuthenticated } = require("../middleware/auth");
const sendToken = require("../utils/jwtToken");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../model/refreshToken");
const multer = require("multer");

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

//load env variable
require("dotenv").config({ path: "backend/config/.env" });
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

router.get("/getuser", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password"); // Exclude password from response

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
}));

router.post("/create-order", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    const { cart, shippingAddress, totalPrice, paymentInfo } = req.body;

    const order = await Order.create({
        cart,
        shippingAddress,
        user: req.user.id,
        totalPrice,
        paymentInfo,
    });

    res.status(201).json({
        success: true,
        order,
    });
}));

router.post(
  "/create-user",
  upload.single("avatar"),
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const avatar = req.file ? req.file.path : null; 

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    if (!avatar) {
      return next(new ErrorHandler("Please add an avatar", 400));
    }

    const newUser = new User({
      name,
      email,
      password,
      avatar: {
        url: avatar, 
        public_id: req.file.filename, 
      },
    });

    await newUser.save();
    
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  })
);

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid password", 400));
      }

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });

      await RefreshToken.create({ userId: user._id, token: refreshToken });

      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get("/logout", catchAsyncErrors(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    await RefreshToken.create({ token, blacklisted: true });

    // Clear cookies
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
    });

    res.status(200).json({
        success: true,
        message: "Log out successful!",
        loggedOut: true, // Indicate that the user is logged out
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;
