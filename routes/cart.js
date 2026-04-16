const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Get cart
router.get("/:phone", async (req, res) => {
  const cart = await Cart.findOne({ phone: req.params.phone }).populate("items.productId");
  res.json(cart || { items: [] });
});

// Add to cart
router.post("/add", async (req, res) => {
  const { phone, productId, quantity } = req.body;

  let cart = await Cart.findOne({ phone });

  if (!cart) {
    cart = new Cart({ phone, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Remove item
router.delete("/remove", async (req, res) => {
  const { phone, productId } = req.body;

  const cart = await Cart.findOne({ phone });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  res.json(cart);
});

module.exports = router;