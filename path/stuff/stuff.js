// Import function
const Stuffs = require('../../model/stuff').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Stuffs.findAll({
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
        Stuffs.findOne({
            where: {
                idStuff:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Stuff not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Stuffs.findAll({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Stuff not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newStuff){
    return new Promise((resolve, reject) => {
        Stuffs.create(newStuff)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Stuff not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newStuff){
    return new Promise((resolve, reject) => {
        Stuffs.update(
            { name: newStuff.name,
              libelle: newStuff.libelle,
              unlocked: newStuff.unlocked,
              number: newStuff.number,
              idSlot: newStuff.idSlot,
              deleted: newStuff.deleted },
            { where: {idStuff:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Stuff not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Stuffs.destroy({
            where: {
                idStuff:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Stuff.. Good.. job?');
            } else
                reject('Stuff not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};