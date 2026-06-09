import express from "express";

const router = express.Router();
import Order from "../models/Order";
import { createShipment } from "../utils/delhivery";
router.get("/:phone", async (req, res) => {
  try {
    const orders = await Order.find({
      phone: req.params.phone,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});
// 🔥 CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const { phone, items, totalAmount, address } = req.body;

    // 1️⃣ Save order first
    let order = new Order({
      phone,
      items,
      totalAmount,
      address,
    });

    await order.save();

    // 2️⃣ Create shipment in Delhivery
    const awb = await createShipment(order);

    // 3️⃣ Save tracking ID
    if (awb) {
      order.tracking_id = awb;
      order.status = "confirmed";
      await order.save();
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order failed" });
  }
});

export default router;