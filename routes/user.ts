import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { phone } = req.body;

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  res.json(user);
});

export default router;