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

// Create user
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

    
    console.log("Creating user with email:", email); 
    console.log("Password before hashing:", password); 

    const newUser = new User({
      name,
      email,
      password,
      avatar: {
        url: avatar, 
        public_id: req.file.filename, 
      },
    });

    
    console.log("User object before saving:", newUser); 
    await newUser.save();
    console.log("User created successfully:", newUser); 

    
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
        return next(
          new ErrorHandler("Please provide both email and password", 400)
        );
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid password", 400));
      }

      //generate access and refresh token
      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });

      //store refresh token in database
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

//refresh access token
// router.post("/token", async (req, res) => {
//   const { token } = req.body;
//   if (!token) return res.status(401).json({ message: "Token is required" });

//   //check token exists in database
//   const storeToken = await RefreshToken.findOne({ token });
//   if (!storeToken)
//     return res.status(401).json({ message: "Invalid refresh token" });

//   //verify
//   jwt.verify(token, refreshTokenSecret, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid refresh token" });

//     const newAccessToken = jwt.sign({ id: user.id }, accessTokenSecret, {
//       expiresIn: "15m",
//     });
//     res.json({ accessToken: newAccessToken });
//   });
// });

//refresh access token
router.post("/token", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Token is required" });

  // Check if the token is blacklisted
  const blacklistedToken = await RefreshToken.findOne({ token, blacklisted: true });
  if (blacklistedToken) return res.status(401).json({ message: "Token is blacklisted" });

  // Check if the token exists in the database
  const storeToken = await RefreshToken.findOne({ token });
  if (!storeToken) return res.status(401).json({ message: "Invalid refresh token" });

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    res.json({ success: true, accessToken: newAccessToken });
  });
});

router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist", 404));
      }

      // Check if the user is a seller
      if (user.role === 'seller') {
        // Return only seller-specific data
        res.status(200).json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            shop: user.shop, // Assuming the user model has a shop field
          },
        });
      } else {
        // Return user data for non-sellers
        res.status(200).json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out user
router.get("/logout", catchAsyncErrors(async (req, res, next) => {
  try {
    // Get the refresh token from the cookie
    const token = req.cookies.token;

    // Add the token to the blacklist
    await RefreshToken.create({ token, blacklisted: true });

    // Clear cookies
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      // secure: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;