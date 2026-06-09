import crypto from "crypto";

const generateTrackingId = (): string => {
  const randomPart = crypto.randomBytes(4).toString("hex");

  const timestamp = Date.now();

  return `ORD-${timestamp}-${randomPart}`;
};

export default generateTrackingId;