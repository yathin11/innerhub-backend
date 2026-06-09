"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
// 🔥 TRACK BY AWB
router.get("/:awb", async (req, res) => {
    try {
        const awb = req.params.awb;
        const response = await axios_1.default.get(`https://track.delhivery.com/api/v1/packages/json/?waybill=${awb}`, {
            headers: {
                Authorization: `Token ${process.env.DELHIVERY_API_KEY}`,
            },
        });
        res.json(response.data);
    }
    catch (err) {
        res.status(500).json({ message: "Tracking failed" });
    }
});
exports.default = router;
