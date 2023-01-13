// Option 1: Passing a connection URI
require('dotenv').config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './migration/database.sqlite',
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/userModel")(sequelize, Sequelize);

module.exports = db;


