// Import function
const Class = require('../../model/class').module;
const error = require('../../errors/notFound');

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Class.findAll({
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
        Class.findOne({
            where: {
                idClass:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Class not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Class.findAll({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Class not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newClass){
    return new Promise((resolve, reject) => {
        Class.create(newClass)
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

exports.updateOne = async function updateOne(id, newClass){
    return new Promise((resolve, reject) => {
        Class.update(
            { name: newClass.name,
              libelle: newClass.libelle,
              deleted: newClass.deleted },
            { where: {idClass:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Class not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Class.destroy({
            where: {
                idClass:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Class.. Good.. job?');
            } else
                reject('Class not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};