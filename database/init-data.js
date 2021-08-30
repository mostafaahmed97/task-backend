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
  } catch (e) {
    console.log(e);
  }
}

module.exports = initData;
