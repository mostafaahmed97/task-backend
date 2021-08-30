const { models } = require("../database");

const checkItemOwnership = async (req, res, next) => {
  if (!req.params.cartItemId)
    return res.status(400).json({ message: "Item ID can not be empty" });
  try {
    var cartItemId = req.params.cartItemId;
    var cartItem = await models.cartitem.findOne({ where: { id: cartItemId } });
    if (!cartItem) return res.status(404).send({ error: "No item to delete" });
    var userCart = await models.cart.findOne({
      where: { id: req.userData.id },
    });
    var cartId = userCart.id;
    if (cartId != cartItem.cartId) return res.status(403).send();
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { checkItemOwnership };
