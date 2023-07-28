import express from "express";
import {
  addToCart,
  deleteCartItem,
  getAllCartItems,
} from "../models/cart-model/cartModel.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { itemId, userId } = req.body;
    const result = await getAllCartItems(itemId, userId);
    result.length &&
      res.json({
        status: success,
        message: "cart items are returned",
        result,
      });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await addToCart(req.body);
    result._id
      ? res.json({
          status: "success",
          message: "The item has been added to the cart",
        })
      : res.json({ status: "error", message: "request unsuccessfull" });
  } catch (error) {
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const result = await deleteCartItem(req.body);
    result._id
      ? res.json({
          status: "success",
          message: "The item has been removed",
        })
      : res.json({
          status: "error",
          message: "Request unsuccessful",
        });
  } catch (error) {
    next(error);
  }
});
export default router;
