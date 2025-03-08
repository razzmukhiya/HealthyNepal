const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Wishlist = require("../model/wishlist");
const { isAuthenticated } = require("../middleware/auth");

// Fetch all wishlist items 
router.get("/my-wishlist", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    const wishlistItems = await Wishlist.find({ user: req.user.id });

    if (!wishlistItems) {
        return res.status(404).json({
            success: false,
            message: "No wishlist items found for this user."
        });
    }

    res.status(200).json({
        success: true,
        wishlistItems
    });
}));

module.exports = router;
