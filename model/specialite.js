// Import modul
const Sequelize = require('sequelize');

// Import login
const sequelizeConnection = require('../login/loginBDD').login;

let Specialite = sequelizeConnection.define('SPECIALITE', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false
    },
    libelle: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{
    timestamps: false,
    freezeTableName: true
  });

Specialite.sync()
  .then(function(arg){
    console.log('Sync Specialite ok...');
  }).catch(err => {
    console.log('error', err)
    reject(err);
  });

exports.module = Specialite;