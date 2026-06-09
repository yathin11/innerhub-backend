"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const generateTrackingId = () => {
    const randomPart = crypto_1.default.randomBytes(4).toString("hex");
    const timestamp = Date.now();
    return `ORD-${timestamp}-${randomPart}`;
};
exports.default = generateTrackingId;
