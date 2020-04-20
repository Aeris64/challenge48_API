const jsonfile = require('jsonfile');
const config = jsonfile.readFileSync('./config.json');

const Sequelize = require('sequelize');

exports.login = new Sequelize(config.name, config.user, config.pass, {
  host: config.host,
  dialect: config.type,
  logging: false // console.log
});