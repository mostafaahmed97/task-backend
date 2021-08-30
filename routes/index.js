const express = require("express");
const router = express.Router();

router.use("/products", require("./product.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/coupons", require("./coupon.routes"));

module.exports = router;
