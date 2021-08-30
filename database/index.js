// This file sets up the db connection,
// imports the models, initializes them using the db connection
// and sets up their relationships,
// Models will then be accessible from the db instance
const { Sequelize } = require("sequelize");
const applyRelations = require("./apply-realtions");
const modelDefiners = [require("./models/Product")];

// Initializes sequelize instace
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

// Initiliaze the models
for (var modelDefiner of modelDefiners) {
  modelDefiner(db);
}

// Apply relations
applyRelations(db);

//Export the db instance for usage in other modules
module.exports = db;
