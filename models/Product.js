const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  basePrice: Number,

  variants: [
    {
      color: String,

      images: [String],

      sizes: [
        {
          size: String,
          price: Number,
          offerPercent: Number,
          offerPrice: Number,
          stock: Number
        }
      ]
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);