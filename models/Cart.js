const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  phone: String,
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);