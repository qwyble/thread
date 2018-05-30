var env = process.env.NODE_ENV || "development";
var config = require('../config/config.json')[env];
var Sequelize = require('sequelize');
var sequelize =
  new Sequelize(
    config.database,
    config.username,
    config.password,
    {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('connection has been established');
  })
  .catch(err => {
    console.error('unable to connect to db', err);
  });

module.exports = {sequelize, Sequelize};
