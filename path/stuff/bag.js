// Import function
const Bags = require('../../model/bag').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Bags.findAll({})
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
        Bags.findAll({
            where: {
                idCharacters:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not bag...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newBags){
    return new Promise((resolve, reject) => {
        Bags.create(newBags)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Bag not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(Bags){
    return new Promise((resolve, reject) => {
        Bags.destroy({
            where: {
                idStuff: Bags.idStuff,
                idCharacters: Bags.idCharacters
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Bag.. Good.. job?');
            } else
                reject('Bag not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};