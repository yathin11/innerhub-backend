const express = require("express");
const router = express.Router();
const axios = require("axios");

// 🔥 TRACK BY AWB
router.get("/:awb", async (req, res) => {
  try {
    const awb = req.params.awb;

    const response = await axios.get(
      `https://track.delhivery.com/api/v1/packages/json/?waybill=${awb}`,
      {
        headers: {
          Authorization: `Token ${process.env.DELHIVERY_API_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Tracking failed" });
  }
});

module.exports = router;