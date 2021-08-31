// Cart business logic, will handle all operations done on cart
const { models } = require("../database");

/**
 * Gets user cart items with associated product details
 * @param {Number} userId
 * @returns Object
 */
const getCartItems = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await models.cart.findOne({
        where: { userId },
        include: {
          model: models.cartitem,
          include: [models.product],
        },
      });
      resolve(data.cartitems);
    } catch (e) {
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
      if (!product) throw { status: 404, message: "Product not found" };

      if (await models.cartitem.findOne({ where: { cartId, productId } }))
        throw { status: 403, message: "Product already in cart" };

      let newCartItem = await models.cartitem.create({ cartId, productId });
      newCartItem.setDataValue("product", product);
      resolve(newCartItem);
    } catch (e) {
      console.log(e);
      reject({ status: e.status, message: e });
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

const updateCartItem = (userId, productData) => {};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
};
