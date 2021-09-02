const express = require("express");
const router = express.Router();
const ProductService = require("../services/product.service");

router.get("/", async (req, res) => {
  try {
    let products = await ProductService.getProducts();
    res.status(200).json(products);
  } catch (e) {
    res.status(e.status).json(e.message);
  }
});

module.exports = router;
