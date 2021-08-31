const express = require("express");
const router = express.Router();
const CartService = require("../services/cart.service");
const {
  checkItemOwnership,
  getUserCartId,
} = require("../middleware/cart.middleware");

router.get("/", async (req, res) => {
  try {
    let items = await CartService.getCartItems(req.userData.id);
    res.status(200).json(items);
  } catch (e) {
    res.status(e.status).send(e.message);
  }
});

router.delete("/clear", getUserCartId, async (req, res) => {
  try {
    await CartService.clearCart(req.userData.cartId);
    res.status(200).send();
  } catch (e) {
    res.status(e.status).send(e.message);
  }
});

router.delete("/:cartItemId", checkItemOwnership, async (req, res) => {
  try {
    await CartService.removeFromCart(req.params.cartItemId);
    res.status(200).send();
  } catch (e) {
    res.status(e.status).send(e.message);
  }
});

router.post("/", getUserCartId, async (req, res) => {
  try {
    if (!req.body.productId)
      throw { status: 400, message: "Cannot add to cart" };
    let addedItem = await CartService.addToCart(
      req.userData.cartId,
      req.body.productId
    );
    res.status(200).json(addedItem);
  } catch (e) {
    res.status(e.status).send(e.message);
  }
});

router.patch("/:cartItemId", checkItemOwnership, async (req, res) => {
  try {
    await CartService.updateCartItem(req.params.cartItemId, req.body.quantity);
    res.status(201).send();
  } catch (e) {
    res.status(e.status).send(e.message);
  }
});

module.exports = router;
