// Cart business logic, will handle all operations done on cart
const { models } = require("../database");

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

const addToCart = (cartId, productId) => {};

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
