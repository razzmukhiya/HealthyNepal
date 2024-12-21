const express = require("express");
const { isAuthenticated, optionalAuth } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order.js");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for product images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ErrorHandler('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  }
});

// Public routes - no auth required
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().populate("shop").sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/get-product/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id).populate("shop");

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Protected routes - auth required
router.post(
  "/create-product",
  isAuthenticated,
  upload.array('images', 5),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      
      if (!shop) {
        if (req.files) {
          req.files.forEach(file => {
            fs.unlinkSync(file.path);
          });
        }
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const imagesLinks = req.files ? req.files.map(file => ({
        public_id: file.filename,
        url: `/uploads/${file.filename}`
      })) : [];

      if (imagesLinks.length === 0) {
        return next(new ErrorHandler("Please upload at least one image", 400));
      }

      const productData = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
        originalPrice: req.body.originalPrice,
        discountPrice: req.body.discountPrice,
        stock: req.body.stock,
        images: imagesLinks,
        shop: shop._id,
        shopId: shopId
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      if (req.files) {
        req.files.forEach(file => {
          fs.unlinkSync(file.path);
        });
      }
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/get-all-products-shop/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id }).populate("shop");

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.delete(
  "/delete-shop-product/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }    

      product.images.forEach(image => {
        const filePath = path.join(__dirname, '../../uploads', image.public_id);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.put(
  "/update-product/:id",
  isAuthenticated,
  upload.array('images', 5),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      product.name = req.body.name;
      product.description = req.body.description;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.originalPrice = req.body.originalPrice;
      product.discountPrice = req.body.discountPrice;
      product.stock = req.body.stock;

      const existingImages = JSON.parse(req.body.existingImages || '[]');
      
      product.images.forEach(image => {
        if (!existingImages.includes(image.url)) {
          const filePath = path.join(__dirname, '../../uploads', image.public_id);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      });

      const remainingImages = product.images.filter(image => 
        existingImages.includes(image.url)
      );

      if (req.files && req.files.length > 0) {
        const newImagesLinks = req.files.map(file => ({
          public_id: file.filename,
          url: `/uploads/${file.filename}`
        }));
        product.images = [...remainingImages, ...newImagesLinks];
      } else {
        product.images = remainingImages;
      }

      await product.save();

      res.status(200).json({
        success: true,
        product
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            rev.rating = rating;
            rev.comment = comment;
            rev.user = user;
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      if (orderId) {
        await Order.findByIdAndUpdate(
          orderId,
          { $set: { "cart.$[elem].isReviewed": true } },
          { arrayFilters: [{ "elem._id": productId }], new: true }
        );
      }

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
