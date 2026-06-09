import mongoose from "mongoose";

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
          stock: Number,
        },
      ],
    },
  ],
});

export default mongoose.model("Product", productSchema);