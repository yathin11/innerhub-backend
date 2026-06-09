import { Request, Response } from "express";
import Cart from "../models/Cart";

export const getCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cart = await Cart.findOne({
      phone: req.params.phone,
    }).populate("items.productId");

    res.json(cart || { items: [] });
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

export const saveCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { phone, items } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { phone },
      { phone, items },
      {
        upsert: true,
        new: true,
      }
    );

    res.json(cart);
  } catch (error: any) {
    res.status(500).json({
      message: "Error saving cart",
      error: error.message,
    });
  }
};