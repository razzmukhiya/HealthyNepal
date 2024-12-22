  const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Shop = require("../model/shop");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'doc-' + Date.now() + path.extname(file.originalname));
  }
});

// Configure multer for document upload
const documentUpload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images and PDFs are allowed!"));
  }
});

// Configure multer for avatar upload
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads/avatars');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
  }
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
  }
});

// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      const user = await Shop.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user: {
          _id: user._id,
          name: user.name || 'Seller',
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          address: user.address,
          phoneNumber: user.phoneNumber,
          zipCode: user.zipCode
        }
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// create shop
router.post(
  "/create-shop",
  documentUpload.single('document'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, name, password, address, phoneNumber, zipCode } = req.body;
      
      const sellerEmail = await Shop.findOne({ email });
      if (sellerEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const newShop = await Shop.create({
        name,
        email,
        password,
        address,
        phoneNumber,
        zipCode,
        document: req.file ? {
          url: `/uploads/${req.file.filename}`,
          public_id: req.file.filename,
        } : {
          url: "",
          public_id: "",
        }
      });

      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { id: newShop._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { id: newShop._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        success: true,
        accessToken,
        refreshToken,
        user: {
          _id: newShop._id,
          name: newShop.name,
          email: newShop.email,
          role: newShop.role,
          createdAt: newShop.createdAt,
          address: newShop.address,
          phoneNumber: newShop.phoneNumber,
          zipCode: newShop.zipCode,
          avatar: newShop.avatar
        }
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get seller details
router.get(
  "/getSeller",
  isAuthenticated,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.user.id).select("-password");

      if (!seller) {
        return next(new ErrorHandler("Seller doesn't exist", 404));
      }

      res.status(200).json({
        success: true,
        seller: {
          _id: seller._id,
          name: seller.name || 'Seller',
          email: seller.email,
          role: seller.role,
          createdAt: seller.createdAt,
          address: seller.address,
          phoneNumber: seller.phoneNumber,
          zipCode: seller.zipCode,
          avatar: seller.avatar
        }
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  isSeller,
  avatarUpload.single('avatar'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!req.file) {
        return next(new ErrorHandler("Please provide an avatar image", 400));
      }

      const seller = await Shop.findById(req.user.id);
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      // Update avatar
      seller.avatar = {
        public_id: req.file.filename,
        url: `${process.env.BACKEND_URL}/uploads/avatars/${path.basename(req.file.filename)}`
      };

      await seller.save();

      res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        avatar: seller.avatar
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller info
router.put(
  "/update-seller-info",
  isAuthenticated,
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, description, address, phoneNumber, zipCode } = req.body;
      
      const seller = await Shop.findById(req.user.id);
      
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      // Check if email is being changed and if it's already in use
      if (email !== seller.email) {
        const existingShop = await Shop.findOne({ email });
        if (existingShop) {
          return next(new ErrorHandler("Email already in use", 400));
        }
      }

      // Update seller information
      seller.name = name;
      seller.email = email;
      seller.description = description;
      seller.address = address;
      seller.phoneNumber = phoneNumber;
      seller.zipCode = zipCode;

      await seller.save();

      res.status(200).json({
        success: true,
        message: "Shop info updated successfully",
        seller: {
          _id: seller._id,
          name: seller.name,
          email: seller.email,
          description: seller.description,
          role: seller.role,
          createdAt: seller.createdAt,
          address: seller.address,
          phoneNumber: seller.phoneNumber,
          zipCode: seller.zipCode,
          avatar: seller.avatar
        }
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// refresh token
router.post(
  "/token",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { token } = req.body;
      if (!token) {
        return next(new ErrorHandler("Token is required", 401));
      }

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded || !decoded.id) {
        return next(new ErrorHandler("Invalid refresh token", 401));
      }

      // Check if seller exists
      const seller = await Shop.findById(decoded.id);
      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { id: seller._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15m" }
      );

      res.status(200).json({
        success: true,
        accessToken
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return next(new ErrorHandler("Token expired", 401));
      }
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// logout - client-side only
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        message: "Logged out successfully"
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
