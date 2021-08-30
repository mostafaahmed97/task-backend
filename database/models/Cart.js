// Exports a fn that attaches model to sequelize instance
const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  });
};
