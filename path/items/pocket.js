// Import function
const Pockets = require('../../model/pocket').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Pockets.findAll({})
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
        Pockets.findAll({
            where: {
                idCharacters:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not Pockets...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newPocket){
    return new Promise((resolve, reject) => {
        Pockets.create(newPocket)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Pocket not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newPocket){
    return new Promise((resolve, reject) => {
        Pockets.update(
            { number: newPocket.number },
            { where: {idCharacters:newPocket.idCharacters, idItems:newPocket.idItems} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Pocket not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(pocket){
    return new Promise((resolve, reject) => {
        Pockets.destroy({
            where: {
                idCharacters:pocket.idCharacters,
                idItems:pocket.idItems
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Pocket.. Good.. job?');
            } else
                reject('Pocket not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};