import { Request, Response } from "express";
import Order from "../models/Order";

export const placeOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({
      message: "Order creation failed",
      error: error.message,
    });
  }
};

export const getOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

export const getOrderByPhone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find({
      phone: req.params.phone,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(order);
  } catch (error: any) {
    res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};