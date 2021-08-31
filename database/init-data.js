const initUsers = [
  {
    name: "Drake",
    email: "a@a",
    password: "$2a$12$JgOMdWozL176LJRlaKiLduf2.jIJ0AXfeHSthcHYkfxzDV5yHUbmy",
  },
  {
    name: "Marwan Pablo",
    email: "b@b",
    password: "$2a$12$JgOMdWozL176LJRlaKiLduf2.jIJ0AXfeHSthcHYkfxzDV5yHUbmy",
  },
  {
    name: "Madeon",
    email: "c@c",
    password: "$2a$12$JgOMdWozL176LJRlaKiLduf2.jIJ0AXfeHSthcHYkfxzDV5yHUbmy",
  },
];
const initProducts = [
  {
    name: "Headphones",
    description: "Quality closed back headphones",
    available_quantity: 14,
    img: "",
    price: 1750,
  },
  {
    name: "Bass Guitar",
    description: "Plays groovy basslines",
    available_quantity: 25,
    img: "",
    price: 1900,
  },
  {
    name: "Audio Interface",
    description: "Record your greatest sounds",
    available_quantity: 5,
    img: "",
    price: 1950,
  },
];

const cartItems = [
  { cartId: 1, prodId: 1 },
  { cartId: 1, prodId: 2 },
  { cartId: 1, prodId: 3 },
  { cartId: 2, prodId: 1 },
  { cartId: 2, prodId: 3 },
  { cartId: 3, prodId: 1 },
];

const coupons = [
  {
    code: "SUMMER15",
    type: "fixed",
    amount: 15,
    start_date: "2021-8-1",
    end_date: "2021-10-1",
  },
  {
    code: "SCHOOLBREAK",
    type: "percent",
    amount: 15,
    start_date: "2021-9-15",
    end_date: "2021-10-1",
  },
  {
    code: "WINTER30",
    type: "percent",
    amount: 30,
    start_date: "2021-7-1",
    end_date: "2021-8-1",
  },
];

async function initData(db) {
  const { models } = db;
  try {
    for (var user of initUsers) {
      let insertedUser = await models.user.create(user);
      await insertedUser.createCart();
    }

    for (var product of initProducts) {
      await models.product.create(product);
    }

    for (var item of cartItems) {
      let cartItem = await models.cartitem.build({
        cartId: item.cartId,
        productId: item.prodId,
      });

      await cartItem.save();
    }

    for (var coupon of coupons) {
      await models.coupon.create(coupon);
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = initData;
