const express = require("express");
const router = express.Router();
const { getUserCartId } = require("../middleware/cart.middleware");
const CouponService = require("../services/coupon.service");

router.post("/check", async (req, res) => {
  try {
    let code = await CouponService.checkValid(req.body.code);
    res.status(200).json(code);
  } catch (e) {
    res.status(e.status).json(e.message);
  }
});

router.post("/apply", getUserCartId, async (req, res) => {
  try {
    let discount = await CouponService.apply(
      req.body.code,
      req.userData.cartId
    );
    res.status(201).json(discount);
  } catch (e) {
    res.status(e.status).json(e.message);
  }
});

module.exports = router;
