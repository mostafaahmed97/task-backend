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
  res.send(req.params.cartItemId);
});

module.exports = router;
