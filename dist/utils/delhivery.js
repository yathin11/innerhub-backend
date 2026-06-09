"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShipment = void 0;
const axios_1 = __importDefault(require("axios"));
const createShipment = async (order) => {
    try {
        const response = await axios_1.default.post("https://track.delhivery.com/api/cmu/create.json", {}, {
            headers: {
                Authorization: `Token ${process.env.DELHIVERY_API_KEY}`,
            },
        });
        return response?.data?.packages?.[0]?.waybill || null;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
exports.createShipment = createShipment;
