// Import function
const Slots = require('../../model/slot').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Slots.findAll({
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
        Slots.findOne({
            where: {
                idSlot:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Slot not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Slots.findAll({
            where: {
                idUniverse:id,
                deleted: null
            },
            order: [
                ['category', 'ASC'],
                ['order', 'ASC'],
            ]
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Slots not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newSlot){
    return new Promise((resolve, reject) => {
        Slots.create(newSlot)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Slot not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newSlot){
    return new Promise((resolve, reject) => {
        Slots.update(
            { name: newSlot.name,
              order: newSlot.order,
              category: newSlot.category,
              deleted: newSlot.deleted },
            { where: {idSlot:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Slot not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Slots.destroy({
            where: {
                idSlot:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Slot.. Good.. job?');
            } else
                reject('Slot not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};