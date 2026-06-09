"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Cart_1 = __importDefault(require("../models/Cart"));
const router = express_1.default.Router();
router.get("/:phone", async (req, res) => {
    const cart = await Cart_1.default.findOne({
        phone: req.params.phone,
    }).populate("items.productId");
    res.json(cart || { items: [] });
});
router.post("/add", async (req, res) => {
    const { phone, productId, quantity } = req.body;
    let cart = await Cart_1.default.findOne({ phone });
    if (!cart) {
        cart = new Cart_1.default({
            phone,
            items: [],
        });
    }
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    }
    else {
        cart.items.push({
            productId,
            quantity,
        });
    }
    await cart.save();
    res.json(cart);
});
router.delete("/remove", async (req, res) => {
    const { phone, productId } = req.body;
    const cart = await Cart_1.default.findOne({ phone });
    if (!cart) {
        return res.status(404).json({
            message: "Cart not found",
        });
    }
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
});
exports.default = router;
