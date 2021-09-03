// Products business logic
const { models } = require("../database");

const getProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = models.product.findAll({});
      resolve(products);
    } catch (e) {
      reject({
        status: e.status,
        message: { error: "Error while fetching products" },
      });
    }
  });
};

module.exports = { getProducts };
