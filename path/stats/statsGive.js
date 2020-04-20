// Import function
const StatsGive = require('../../model/statsGive').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        StatsGive.findAll({})
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

exports.getAllByIdStuffs = async function getAllByIdStuffs(id){
    return new Promise((resolve, reject) => {
        StatsGive.findAll({
            where: {
                idStuff:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not statsGive...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newStatsGive){
    return new Promise((resolve, reject) => {
        Stats.create(newStatsGive)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('StatGive not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newStatsGive){
    return new Promise((resolve, reject) => {
        Stats.update(
            { number: newStatsGive.number },
            { where: {idStuff: newStatsGive.idStuff, idStats: newStatsGive.idStats} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('StatGive not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(statGive){
    return new Promise((resolve, reject) => {
        Stats.destroy({
            where: {
                idStuff: statGive.idStuff,
                idStats: statGive.idStats
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some StatGive.. Good.. job?');
            } else
                reject('StatGive not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};