"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find().sort({ _id: -1 });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                message: "Product not found",
            });
            return;
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message,
        });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const product = await Product_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({
            message: "Error updating product",
            error: error.message,
        });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        await Product_1.default.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
        });
    }
    catch (error) {
        console.error("PRODUCT ERROR:", error);
        res.status(500).json({
            message: "Error fetching products",
            error: String(error),
        });
    }
};
exports.deleteProduct = deleteProduct;
