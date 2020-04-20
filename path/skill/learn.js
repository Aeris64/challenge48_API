// Import function
const Learn = require('../../model/learn').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Learn.findAll({})
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
        Learn.findAll({
            where: {
                idCharacters:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not Learn...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newLearn){
    return new Promise((resolve, reject) => {
        Learn.create(newLearn)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Learn not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newLearn){
    return new Promise((resolve, reject) => {
        Learn.update(
            { number: newLearn.number },
            { where: {idCharacters: newLearn.idCharacters, idSkill: newLearn.idSkill} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Learn not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(Learn){
    return new Promise((resolve, reject) => {
        Learn.destroy({
            where: {
                idCharacters: Learn.idCharacters,
                idSkill: Learn.idSkill
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Learn.. Good.. job?');
            } else
                reject('Learn not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};