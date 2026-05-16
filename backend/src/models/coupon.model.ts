const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
    },

    discountValue: Number,

    minOrderAmount: Number,

    expiryDate: Date,

    usageLimit: Number,

    usedCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
