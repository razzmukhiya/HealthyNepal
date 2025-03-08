const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
    trim: true,
    index: true 
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
    index: true
  },
  tags: [{
    type: String,
    index: true 
  }],
  originalPrice: {
    type: Number,
    required: [true, "Please enter your product price!"]
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your product discount price!"]
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"]
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      }
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  shopId: {
    type: String,
    required: true,
    index: true 
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
    index: true 
  },
  sold_out: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: true 
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ shopId: 1, createdAt: -1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });


productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.discountPrice) {
    return Math.round(((this.originalPrice - this.discountPrice) / this.originalPrice) * 100);
  }
  return 0;
});


productSchema.pre('save', function(next) {
  this.sold_out = this.stock <= 0;
  next();
});


productSchema.methods.updateRatings = function() {
  if (this.reviews && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    this.ratings = totalRating / this.reviews.length;
  } else {
    this.ratings = 0;
  }
};


productSchema.statics.findByCategory = async function(category, limit = 10) {
  return this.find({ category })
    .select('name description originalPrice discountPrice stock images ratings')
    .sort('-createdAt')
    .limit(limit)
    .lean();
};


productSchema.statics.getTrendingProducts = async function(limit = 10) {
  return this.find({ ratings: { $gt: 4 }, stock: { $gt: 0 } })
    .select('name originalPrice discountPrice images ratings')
    .sort('-ratings -createdAt')
    .limit(limit)
    .lean();
};


const Product = mongoose.model("Product", productSchema);
Product.syncIndexes().then(() => {
  console.log('Product indexes synchronized');
}).catch(err => {
  console.error('Error synchronizing product indexes:', err);
});

module.exports = Product;
