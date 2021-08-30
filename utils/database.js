// Initializes sequelize instace
const { Sequelize } = require("sequelize");

const db = new Sequelize("task-db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
});

module.exports = db;
