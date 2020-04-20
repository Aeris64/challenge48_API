// Import function
const Offre = require('../../model/offre').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Offre.findAll({})
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
        Items.findOne({
            where: {
                idItems:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Item not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Items.findAll({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Items not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newItems){
    return new Promise((resolve, reject) => {
        Items.create(newItems)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Item not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newItems){
    return new Promise((resolve, reject) => {
        Items.update(
            { name: newItems.name,
              libelle: newItems.libelle,
              unlocked: newItems.unlocked,
              deleted: newItems.deleted },
            { where: {idItems:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Items not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Items.destroy({
            where: {
                idItems:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Items.. Good.. job?');
            } else
                reject('Items not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};