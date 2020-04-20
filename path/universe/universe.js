// Import function
const Universes = require('../../model/universe').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Universes.findAll({
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
        Universes.findOne({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Universe not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newUniverse){
    return new Promise((resolve, reject) => {
        Universes.create(newUniverse)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Universe not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newUniverse){
    return new Promise((resolve, reject) => {
        Universes.update(
            { name: newUniverse.name,
              deleted: newUniverse.deleted },
            { where: {idUniverse:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Universe not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Universes.destroy({
            where: {
                idUniverse:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Universe.. Good.. job?');
            } else
                reject('Universe not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};