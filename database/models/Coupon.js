// Exports a fn that attaches model to sequelize instance
const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("coupon", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM(["percent", "fixed"]),
      allowNull: false,
      defaultValue: "fixed",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};
