const crypto = require("crypto");

function generateTrackingId() {

  const randomPart = crypto.randomBytes(4).toString("hex");

  const timestamp = Date.now();

  const trackingId = `ORD-${timestamp}-${randomPart}`;

  return trackingId;
}

module.exports = generateTrackingId;