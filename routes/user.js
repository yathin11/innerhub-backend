const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save phone
router.post("/", async (req, res) => {
  const { phone } = req.body;

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  res.json(user);
});

module.exports = router;