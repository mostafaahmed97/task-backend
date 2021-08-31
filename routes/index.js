const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

router.use("/auth", require("./auth.routes"));
router.use("/products", require("./product.routes"));
router.use("/cart", auth, require("./cart.routes"));
router.use("/coupons", auth, require("./coupon.routes"));

module.exports = router;
