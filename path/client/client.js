// Import modul
const Sequelize = require('sequelize');

// Import function
const Client = require('../../model/client').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Client.findAll({attributes: ['id', 'email', 'nom', 'prenom', 'contact']})
        .then(allResult => {
            if(allResult) {
                let finalRes = [];
                for(let res of allResult){
                    finalRes.push(res.dataValues);
                }
                resolve(finalRes);
            } else
                reject(false);
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneById = async function getOneById(id){
    return new Promise((resolve, reject) => {
        Client.findOne({attributes: ['id', 'email', 'nom', 'prenom', 'contact'],
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Client not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneByEmail = async function getOneByEmail(someEmail){
    return new Promise((resolve, reject) => {
        Client.findOne({attributes: ['id', 'email', 'nom', 'prenom', 'contact'],
            where: {
                email:someEmail
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Client not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneByAuth = async function getOneByAuth(email, password){
    return new Promise((resolve, reject) => {
        Client.findOne({attributes: ['id', 'email', 'nom', 'prenom', 'contact'],
            where: {
                email:email,
                password:password
            }
        })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Client not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newClient){
    return new Promise((resolve, reject) => {
        Client.findOne({attributes: ['id', 'email', 'nom', 'prenom', 'contact'],
            where: Sequelize.or(
                {email: newClient.email})
        }).then((client) => {
            if(client)
                resolve(false);
            else{
                Client.create(newClient)
                .then(client => {
                    if(client)
                        resolve(client.dataValues);
                    else
                        reject('Client not create...');
                }).catch(err => {
                    console.log('error', err);
                    reject(err);
                })
            }
        }).catch(err => {
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newClient){
    return new Promise((resolve, reject) => {
        Client.update(
            { pass: newClient.password }, 
            { where: {id:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Client not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Client.destroy({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Client.. Good.. job?');
            } else
                reject('Client not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};