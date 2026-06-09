"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        console.log("Product Model:", Product_1.default);
        const products = await Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        console.error("PRODUCT ERROR:", error);
        res.status(500).json({
            message: "Error fetching products",
            error: String(error),
            stack: error?.stack,
        });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const updated = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch {
        res.status(500).json({ message: "Update failed" });
    }
});
exports.default = router;
