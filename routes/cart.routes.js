const express = require("express");
const router = express.Router();
const CartService = require("../services/cart.service");
const { checkItemOwnership } = require("../middleware/cart.middleware");

router.get("/", async (req, res) => {
  try {
    let items = await CartService.getCartItems(req.userData.id);
    res.status(200).json(items);
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

module.exports = router;
