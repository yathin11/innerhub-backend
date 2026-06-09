"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Order_1 = __importDefault(require("../models/Order"));
const delhivery_1 = require("../utils/delhivery");
// 🔥 CREATE ORDER
router.post("/create", async (req, res) => {
    try {
        const { phone, items, totalAmount, address } = req.body;
        // 1️⃣ Save order first
        let order = new Order_1.default({
            phone,
            items,
            totalAmount,
            address,
        });
        await order.save();
        // 2️⃣ Create shipment in Delhivery
        const awb = await (0, delhivery_1.createShipment)(order);
        // 3️⃣ Save tracking ID
        if (awb) {
            order.tracking_id = awb;
            order.status = "confirmed";
            await order.save();
        }
        res.json(order);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Order failed" });
    }
});
exports.default = router;
