// Import function
const Moneys = require('../../model/money').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Moneys.findAll({
            where: { deleted: null }
        })
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

exports.getOneById = async function getOneById(id){
    return new Promise((resolve, reject) => {
        Moneys.findOne({
            where: {
                idMoney:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Money not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Moneys.findAll({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Moneys not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newMoney){
    return new Promise((resolve, reject) => {
        Moneys.create(newMoney)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Money not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newMoney){
    return new Promise((resolve, reject) => {
        Moneys.update(
            { name: newMoney.name,
              libelle: newMoney.libelle,
              deleted: newMoney.deleted },
            { where: {idMoney:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Moneys not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Moneys.destroy({
            where: {
                idMoney:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Moneys.. Good.. job?');
            } else
                reject('Moneys not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};