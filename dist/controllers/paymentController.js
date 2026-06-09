"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Payment error",
            message: error.message,
        });
    }
};
exports.createOrder = createOrder;
