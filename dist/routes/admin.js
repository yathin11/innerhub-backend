"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
// ================= PRODUCTS =================
// Add product
router.post("/products", async (req, res) => {
    const product = await Product_1.default.create(req.body);
    res.json(product);
});
// Get products
router.get("/products", async (req, res) => {
    const products = await Product_1.default.find();
    res.json(products);
});
// Update product
router.put("/products/:id", async (req, res) => {
    const updated = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});
// Delete product
router.delete("/products/:id", async (req, res) => {
    await Product_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});
// ================= ORDERS =================
// Get all orders
router.get("/orders", async (req, res) => {
    const orders = await Order_1.default.find().populate("items.productId");
    res.json(orders);
});
// Update order status
router.put("/orders/:id", async (req, res) => {
    const { status } = req.body;
    const updated = await Order_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updated);
});
// ================= USERS =================
// Get users
router.get("/users", async (req, res) => {
    const users = await User_1.default.find();
    res.json(users);
});
exports.default = router;
