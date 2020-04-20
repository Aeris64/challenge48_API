// Import function
const Stats = require('../../model/stats').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Stats.findAll({
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
        Stats.findOne({
            where: {
                idStats:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Stats not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Stats.findAll({
            where: {
                idUniverse:id,
                deleted: null
            },
            order: [
                ['order', 'ASC']
            ]
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Stats not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newStats){
    return new Promise((resolve, reject) => {
        Stats.create(newStats)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Stats not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newStats){
    return new Promise((resolve, reject) => {
        Stats.update(
            { name: newStats.name,
              order: newStats.order,
              deleted: newStats.deleted },
            { where: {idStats:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Stats not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Stats.destroy({
            where: {
                idStats:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Stats.. Good.. job?');
            } else
                reject('Stats not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};