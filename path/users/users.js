// Import modul
const Sequelize = require('sequelize');

// Import function
const Users = require('../../model/users').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Users.findAll({attributes: ['id', 'pseudo', 'mail'], 
            where: {
                deleted: null
            }})
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
        Users.findOne({attributes: ['id', 'pseudo', 'mail'],
            where: {
                id:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('User not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneByPseudo = async function getOneByPseudo(somePseudo){
    return new Promise((resolve, reject) => {
        Users.findOne({attributes: ['id', 'pseudo', 'mail'],
            where: {
                pseudo:somePseudo,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('User not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllOneUniverseId = async function getAllOneUniverseId(id){
    return new Promise((resolve, reject) => {
        Users.findAll({attributes: ['id', 'pseudo', 'mail'], where: {idUniverse: id, deleted: null}})
        .then(allResult => {
            if(allResult) {
                let finalRes = [];
                for(let res of allResult){
                    finalRes.push(res.dataValues);
                }
                resolve(finalRes);
            } else
                resolve(false);
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneByAuth = async function getOneByAuth(mail, pass){
    return new Promise((resolve, reject) => {
        Users.findOne({attributes: ['id', 'pseudo', 'mail'],
            where: {
                mail:mail,
                pass:pass,
                deleted: null
            }
        })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('User not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newUser){
    return new Promise((resolve, reject) => {
        Users.findOne({attributes: ['id', 'pseudo', 'mail'],
            where: Sequelize.or(
                {mail: newUser.mail}, 
                {pseudo: newUser.pseudo})
        }).then((user) => {
            if(user)
                resolve(false);
            else{
                Users.create(newUser)
                .then(user => {
                    if(user)
                        resolve(user.dataValues);
                    else
                        reject('User not create...');
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

exports.updateOne = async function updateOne(id, newUser){
    return new Promise((resolve, reject) => {
        Users.update(
            { pass: newUser.pass,
              deleted: newUser.deleted }, 
            { where: {id:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('User not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Users.destroy({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some User.. Good.. job?');
            } else
                reject('User not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};