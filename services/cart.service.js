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

const addToCart = (userId, productData) => {};

const removeFromCart = (userId, cartItemId) => {};

const updateCartItem = (userId, productData) => {};

module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
};