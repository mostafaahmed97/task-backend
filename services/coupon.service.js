// Coupon business logic
const { models } = require("../database");

const checkValid = async (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!code)
        throw { status: 400, message: { error: "Code can not be empty" } };
      let discount = await models.coupon.findOne({ where: { code } });
      if (!discount)
        throw { status: 404, message: { error: "Coupon code not found" } };

      if (
        new Date(discount.end_date) > Date.now() &&
        new Date(discount.start_date) < Date.now()
      )
        resolve(discount);
      else throw { status: 400, message: { error: "Inactive code" } };
    } catch (e) {
      reject({ status: e.status, message: e.message });
    }
  });
};

const apply = async (code, cartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await models.cart.findOne({ where: { id: cartId } });
      if (cart.couponId)
        throw {
          status: 403,
          message: { error: "A coupon is already applied" },
        };
      let discount = await checkValid(code);
      cart.setCoupon(discount);
      resolve(discount);
    } catch (e) {
      reject({ status: e.status, message: e.message });
    }
  });
};

const remove = async (cartId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await models.cart.findOne({ where: { id: cartId } });
      cart.couponId = null;
      await cart.save();
      resolve();
    } catch (e) {
      reject({ status: e.status, message: e.message });
    }
  });
};
module.exports = { checkValid, apply, remove };
