// Import modul
const Sequelize = require('sequelize');

// Import login
const sequelizeConnection = require('../login/loginBDD').login;

let Offre = sequelizeConnection.define('OFFRE', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    idClient: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    idCateg: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    libelle: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    payant: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    horaires: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },{
    timestamps: false,
    freezeTableName: true
  });

Offre.sync()
  .then(function(arg){
    console.log('Sync Offre ok...');
  }).catch(err => {
    console.log('error', err)
    reject(err);
  });

exports.module = Offre;