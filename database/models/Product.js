// Exports a fn that attaches model to sequelize instance
const { DataTypes } = require("sequelize");

module.exports = (db) => {
  db.define("product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
      get() {
        let imgName = this.getDataValue("img");
        let path = process.env.CURRENT_URL + "/media/images/";
        return path + imgName;
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
