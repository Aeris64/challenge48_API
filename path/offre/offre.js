// Import function
const Offre = require('../../model/offre').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Offre.findAll({})
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
        Offre.findOne({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Offre not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newOffre){
    return new Promise((resolve, reject) => {
        Offre.create(newOffre)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Offre not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newOffre){
    return new Promise((resolve, reject) => {
        Offre.update(
            { libelle: newOffre.libelle,
              payant: newOffre.payant,
              horaires: newOffre.horaires },
            { where: {id:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Offre not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Offre.destroy({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Offre.. Good.. job?');
            } else
                reject('Offre not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};