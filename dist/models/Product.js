"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    basePrice: Number,
    variants: [
        {
            color: String,
            images: [String],
            sizes: [
                {
                    size: String,
                    price: Number,
                    offerPercent: Number,
                    offerPrice: Number,
                    stock: Number,
                },
            ],
        },
    ],
});
exports.default = mongoose_1.default.model("Product", productSchema);
