import mongoose from "mongoose";

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
    default: "placed",
  },
  tracking_id: {
    type: String,
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

export default mongoose.model("Order", orderSchema);