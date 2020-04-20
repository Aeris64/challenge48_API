// Import modul
const Sequelize = require('sequelize');

// Import login
const sequelizeConnection = require('../login/loginBDD').login;

let Categorie = sequelizeConnection.define('CATEGORIE', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    libelle: {
      type: Sequelize.STRING,
      allowNull: false
    },
    idSpecialite: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },{
    timestamps: false,
    freezeTableName: true
  });

Categorie.sync()
  .then(function(arg){
    console.log('Sync Categorie ok...');
  }).catch(err => {
    console.log('error', err)
    reject(err);
  });

exports.module = Categorie;