var env = process.env.NODE_ENV || "development";
const fs = require('fs');
var config = require('../config/config.json')[env];
var Sequelize = require('sequelize');
var sequelize =
  new Sequelize(
    config.database,
    config.username,
    config.password,
    {
    host: '35.238.48.6',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        key: fs.readFileSync('./app/db/client-key.pem'),
        cert: fs.readFileSync('./app/db/client-cert.pem'),
        ca: fs.readFileSync('./app/db/server-ca.pem')
      }
    },
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
