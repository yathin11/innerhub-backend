const db = require("../config/db");
const generateTrackingId = require("../utils/tracking");

exports.placeOrder = async (req, res) => {

  try {

    const { phone, total, items } = req.body;

    const trackingId = generateTrackingId();

    const [orderResult] = await db.query(
      `INSERT INTO orders (phone, total, status, tracking_id)
       VALUES (?, ?, ?, ?)`,
      [phone, total, "Processing", trackingId]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {

      await db.query(
        `INSERT INTO order_items
        (order_id, product_id, color, size, quantity, price)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.productId,
          item.color,
          item.size,
          item.quantity,
          item.price
        ]
      );

    }

    res.json({
      message: "Order placed successfully",
      tracking: trackingId
    });

  } catch (error) {

    res.status(500).json({
      message: "Order failed",
      error: error.message
    });

  }

};


exports.getOrdersByPhone = async (req, res) => {

  try {

    const phone = req.params.phone;

    const [orders] = await db.query(
      "SELECT * FROM orders WHERE phone=? ORDER BY id DESC",
      [phone]
    );

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Tracking failed",
      error: error.message
    });

  }

};