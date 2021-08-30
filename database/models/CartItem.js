// Exports a fn that attaches model to sequelize instance
const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("cartitem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
