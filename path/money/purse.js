// Import function
const Purses = require('../../model/purse').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Purses.findAll({})
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
        Purses.findAll({
            where: {
                idCharacters:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not Purses...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        })
    })
};

exports.createOne = async function createOne(newPurse){
    return new Promise((resolve, reject) => {
        Purses.create(newPurse)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Purse not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newPurse){
    return new Promise((resolve, reject) => {
        Purses.update(
            { number: newPurse.number },
            { where: {idMoney:newPurse.idMoney, idCharacters:newPurse.idCharacters} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Purse not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(purse){
    return new Promise((resolve, reject) => {
        Purses.destroy({
            where: {
                idMoney: purse.idMoney,
                idCharacters: purse.idCharacters
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Purse.. Good.. job?');
            } else
                reject('Purse not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};