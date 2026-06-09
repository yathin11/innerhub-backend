import express, { Request, Response } from "express";
import Cart from "../models/Cart";

const router = express.Router();

router.get("/:phone", async (req: Request, res: Response) => {
  const cart = await Cart.findOne({
    phone: req.params.phone,
  }).populate("items.productId");

  res.json(cart || { items: [] });
});

router.post("/add", async (req: Request, res: Response) => {
  const { phone, productId, quantity } = req.body;

  let cart = await Cart.findOne({ phone });

  if (!cart) {
    cart = new Cart({
      phone,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item: any) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
    } as any);
  }

  await cart.save();

  res.json(cart);
});

router.delete("/remove", async (req: Request, res: Response) => {
  const { phone, productId } = req.body;

  const cart = await Cart.findOne({ phone });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  cart.items = cart.items.filter(
    (item: any) => item.productId.toString() !== productId
  ) as any;

  await cart.save();

  res.json(cart);
});

export default router;