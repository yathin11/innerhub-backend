"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderByPhone = exports.getOrders = exports.placeOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const placeOrder = async (req, res) => {
    try {
        const order = await Order_1.default.create(req.body);
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({
            message: "Order creation failed",
            error: error.message,
        });
    }
};
exports.placeOrder = placeOrder;
const getOrders = async (req, res) => {
    try {
        const orders = await Order_1.default.find()
            .populate("items.productId")
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message,
        });
    }
};
exports.getOrders = getOrders;
const getOrderByPhone = async (req, res) => {
    try {
        const orders = await Order_1.default.find({
            phone: req.params.phone,
        }).sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message,
        });
    }
};
exports.getOrderByPhone = getOrderByPhone;
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order_1.default.findByIdAndUpdate(req.params.id, {
            status: req.body.status,
        }, {
            new: true,
        });
        res.json(order);
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating order",
            error: error.message,
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
