const express = require("express");
const { isAuthenticated, optionalAuth } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order.js");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { logger, logError, logAPIRequest, logDBQuery, logPerformance } = require("../utils/logger");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for product images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save to both backend and frontend uploads directories
    const backendUploadDir = path.join(__dirname, '../../uploads');
    const frontendUploadDir = path.join(__dirname, '../../HealthyNepal/public/uploads');
    
    [backendUploadDir, frontendUploadDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    // Save to backend uploads directory
    cb(null, backendUploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = 'images-' + uniqueSuffix + path.extname(file.originalname);
    
    // Also copy to frontend uploads directory
    const frontendPath = path.join(__dirname, '../../HealthyNepal/public/uploads', filename);
    file.frontendPath = frontendPath;
    
    cb(null, filename);
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

// Cache for products
const productCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
const getCachedData = (key) => {
  const cachedItem = productCache.get(key);
  if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
    return cachedItem.data;
  }
  return null;
};

// Helper function to set cache data
const setCacheData = (key, data) => {
  productCache.set(key, {
    data,
    timestamp: Date.now()
  });
};

// Public routes - no auth required
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const skip = (page - 1) * limit;

      // Simplified query without caching and unnecessary operations
      const products = await Product.find()
        .select('name description category originalPrice discountPrice stock images ratings')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const totalProducts = await Product.countDocuments();

      const response = {
        success: true,
        products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      };

      res.status(200).json(response);
    } catch (error) {
      logError(error, { route: 'get-all-products' });
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/get-product/:id",
  catchAsyncErrors(async (req, res, next) => {
    const startTime = Date.now();
    logAPIRequest(req);

    try {
      const cacheKey = `product_${req.params.id}`;
      const cachedProduct = getCachedData(cacheKey);

      if (cachedProduct) {
        logPerformance('get-product-cache-hit', Date.now() - startTime);
        return res.status(200).json(cachedProduct);
      }

      const queryStartTime = Date.now();
      const product = await Product.findById(req.params.id)
        .populate('shop', 'name address')
        .lean();

      logDBQuery('findById', 'products', { id: req.params.id }, Date.now() - queryStartTime);

      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      const response = {
        success: true,
        product: product || null,
      };

      setCacheData(cacheKey, response);
      logPerformance('get-product-db-query', Date.now() - startTime);

      res.status(200).json(response);
    } catch (error) {
      logError(error, { route: 'get-product', productId: req.params.id });
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
    const startTime = Date.now();
    logAPIRequest(req);

    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId).lean();
      
      if (!shop) {
        if (req.files) {
          req.files.forEach(file => {
            fs.unlinkSync(file.path);
          });
        }
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      const imagesLinks = [];
      if (req.files) {
        for (const file of req.files) {
          // Copy file to frontend uploads directory
          const frontendPath = path.join(__dirname, '../../HealthyNepal/public/uploads', file.filename);
          fs.copyFileSync(file.path, frontendPath);

          imagesLinks.push({
            public_id: file.filename,
            url: `/uploads/${file.filename}`
          });
        }
      }

      if (imagesLinks.length === 0) {
        return next(new ErrorHandler("Please upload at least one image", 400));
      }

      console.log('Image Links:', imagesLinks);

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

      const queryStartTime = Date.now();
      const product = await Product.create(productData);
      logDBQuery('create', 'products', { shopId }, Date.now() - queryStartTime);

      // Clear relevant caches
      productCache.clear();
      logPerformance('create-product', Date.now() - startTime);

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
      logError(error, { route: 'create-product' });
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id })
        .sort({ createdAt: -1 })
        .lean();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      logError(error, { route: 'get-all-products-shop', shopId: req.params.id });
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete product of a shop
router.delete(
  "/delete-product/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return next(new ErrorHandler("Product not found", 404));
      }

      // Delete product images from uploads directory
      if (product.images && product.images.length > 0) {
        product.images.forEach(image => {
          const imagePath = path.join(__dirname, '../../uploads', image.public_id);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });
      }

      await Product.findByIdAndDelete(req.params.id);

      // Clear relevant caches
      productCache.clear();

      res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });
    } catch (error) {
      console.error('Detailed delete error:', {
        message: error.message,
        stack: error.stack,
        productId: req.params.id,
        timestamp: new Date().toISOString()
      });
      logError(error, { 
        route: 'delete-product', 
        productId: req.params.id,
        details: {
          message: error.message,
          stack: error.stack
        }
      });
      return next(new ErrorHandler(`Failed to delete product: ${error.message}`, 500));

    }
  })
);

module.exports = router;
