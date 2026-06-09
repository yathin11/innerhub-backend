"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getCart = async (req, res) => {
    try {
        const cart = await Cart_1.default.findOne({
            phone: req.params.phone,
        }).populate("items.productId");
        res.json(cart || { items: [] });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching cart",
            error: error.message,
        });
    }
};
exports.getCart = getCart;
const saveCart = async (req, res) => {
    try {
        const { phone, items } = req.body;
        const cart = await Cart_1.default.findOneAndUpdate({ phone }, { phone, items }, {
            upsert: true,
            new: true,
        });
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({
            message: "Error saving cart",
            error: error.message,
        });
    }
};
exports.saveCart = saveCart;
