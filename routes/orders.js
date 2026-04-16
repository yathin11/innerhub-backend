const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place order
router.post("/", async (req, res) => {
  const { phone } = req.body;

  const cart = await Cart.findOne({ phone });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart empty" });
  }

  const order = await Order.create({
    phone,
    items: cart.items,
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  res.json(order);
});

// Get orders by phone
router.get("/:phone", async (req, res) => {
  const orders = await Order.find({ phone: req.params.phone })
    .populate("items.productId");

  res.json(orders);
});

module.exports = router;