const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      name: String,
      image: String,

      color: String,
      size: String,

      price: Number,
      quantity: Number,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: [
      "placed",
      "confirmed",
      "shipped",
      "out_for_delivery",
      "delivered",
    ],
    default: "placed",
  },

  tracking_id: {
    type: String, // 🔥 Delhivery AWB
    default: "",
  },

  address: {
    name: String,
    phone: String,
    pincode: String,
    city: String,
    state: String,
    street: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);