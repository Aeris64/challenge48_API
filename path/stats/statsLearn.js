// Import function
const StatsLearn = require('../../model/statsLearn').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        StatsLearn.findAll({})
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

exports.getAllByIdCharacters = async function getAllByIdCharacters(id){
    return new Promise((resolve, reject) => {
        StatsLearn.findAll({
            where: {
                idCharacters:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not statsLearn...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newStatsLearn){
    return new Promise((resolve, reject) => {
        StatsLearn.create(newStatsLearn)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('StatsLearn not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newStatsLearn){
    return new Promise((resolve, reject) => {
        StatsLearn.update(
            { number: newStatsLearn.number },
            { where: {idCharacters: newStatsLearn.idCharacters, idStats: newStatsLearn.idStats} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('StatsLearn not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(statsLearn){
    return new Promise((resolve, reject) => {
        StatsLearn.destroy({
            where: {
                idCharacters: statsLearn.idCharacters,
                idStats: statsLearn.idStats
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some StatsLearn.. Good.. job?');
            } else
                reject('StatsLearn not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};