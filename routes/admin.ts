const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

// ================= PRODUCTS =================

// Add product
router.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Get products
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update product
router.put("/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete product
router.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ================= ORDERS =================

// Get all orders
router.get("/orders", async (req, res) => {
  const orders = await Order.find().populate("items.productId");
  res.json(orders);
});

// Update order status
router.put("/orders/:id", async (req, res) => {
  const { status } = req.body;

  const updated = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

// ================= USERS =================

// Get users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;