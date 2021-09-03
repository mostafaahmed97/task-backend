// Cart business logic, will handle all operations done on cart
const { models } = require("../database");

/**
 * Gets user cart items with associated product details
 * @param {Number} userId
 * @returns Object
 */
const getCartItems = async (cartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cartContent = await models.cart.findOne({
        where: { id: cartId },
        include: [
          models.coupon,
          {
            model: models.cartitem,
            include: models.product,
          },
        ],
      });
      resolve(cartContent);
    } catch (e) {
      console.log(e);
      reject({ status: 500, message: e });
    }
  });
};

/**
 * Checks if product exists
 * then if it is not in cart
 * Then adds the product to cart and returns it
 * @param {Number} cartId
 * @param {Number} productId
 * @returns {Object} addedProduct
 */
const addToCart = (cartId, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await models.product.findOne({ where: { id: productId } });
      if (!product)
        throw { status: 404, message: { error: "Product not found" } };

      if (await models.cartitem.findOne({ where: { cartId, productId } }))
        throw { status: 403, message: { error: "Product already in cart" } };

      let newCartItem = await models.cartitem.create({ cartId, productId });
      newCartItem.setDataValue("product", product);
      resolve(newCartItem);
    } catch (e) {
      console.log(e);
      reject({ status: e.status, message: e.message });
    }
  });
};

const removeFromCart = (cartItemId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.cartitem.destroy({ where: { id: cartItemId } });
      resolve();
    } catch (e) {
      reject({ status: 500, message: e });
    }
  });
};

const clearCart = (cartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.cartitem.destroy({ where: { cartId } });
      resolve();
    } catch (e) {
      reject({ status: 500, message: e });
    }
  });
};

const updateCartItem = (cartItemId, quantity) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (quantity < 1 || !quantity)
        throw { status: 500, message: { error: "Invalid quantity" } };

      let cartItem = await models.cartitem.findOne({
        where: { id: cartItemId },
        include: [models.product],
      });

      if (quantity > cartItem.product.available_quantity)
        throw { status: 500, message: { error: "Invalid quantity" } };

      await cartItem.update({ quantity });
      resolve();
    } catch (e) {
      reject({ status: e.status, message: e.message });
    }
  });
};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
};
