// Import function
const Shopkeepers = require('../../model/shopkeeper').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Shopkeepers.findAll({
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
                reject(false);
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneById = async function getOneById(id){
    return new Promise((resolve, reject) => {
        Shopkeepers.findOne({
            where: {
                idShopkeeper:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Shopkeepers not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Shopkeepers.findAll({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Shopkeepers not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newShopkeepers){
    return new Promise((resolve, reject) => {
        Shopkeepers.create(newShopkeepers)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Shopkeepers not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newShopkeepers){
    return new Promise((resolve, reject) => {
        Shopkeepers.update(
            { name: newShopkeepers.name,
              libelle: newShopkeepers.libelle,
              unlocked: newShopkeepers.unlocked,
              deleted: newShopkeepers.deleted },
            { where: {idShopkeeper:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Shopkeepers not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Shopkeepers.destroy({
            where: {
                idShopkeeper:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Shopkeepers.. Good.. job?');
            } else
                reject('Shopkeepers not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};