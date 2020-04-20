// Import modul
const Sequelize = require('sequelize');

// Import login
const sequelizeConnection = require('../login/loginBDD').login;

let Client = sequelizeConnection.define('CLIENT', {
    id: {
      type: Sequelize.UUID,
      allowNull: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    prenom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    contact: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ville: {
      type: Sequelize.STRING,
      allowNull: false
    },
    code_postal: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rue: {
      type: Sequelize.STRING,
      allowNull: false
    },
    position_LAT: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    position_LONG: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{
    timestamps: false,
    freezeTableName: true
  });

Client.sync()
  .then(function(arg){
    console.log('Sync Client ok...');
  }).catch(err => {
    console.log('error', err)
    reject(err);
  });

exports.module = Client;