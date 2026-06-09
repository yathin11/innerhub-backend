"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    phone: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("Order", orderSchema);
