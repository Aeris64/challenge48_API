// Import function
const Nations = require('../../model/nation').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Nations.findAll({
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
        Nations.findOne({
            where: {
                idNation:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Nation not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Nations.findAll({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Nations not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newNation){
    return new Promise((resolve, reject) => {
        Nations.create(newNation)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Nation not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newNation){
    return new Promise((resolve, reject) => {
        Nations.update(
            { name: newNation.name,
              libelle: newNation.libelle,
              deleted: newNation.deleted },
            { where: {idNation:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Nation not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Nations.destroy({
            where: {
                idNation:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Nation.. Good.. job?');
            } else
                reject('Nation not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};