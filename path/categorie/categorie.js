// Import function
const Categorie = require('../../model/categorie').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Categorie.findAll({})
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
        Categorie.findOne({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Categorie not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newCategorie){
    return new Promise((resolve, reject) => {
        Categorie.create(newCategorie)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Categorie not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newCategorie){
    return new Promise((resolve, reject) => {
        Categorie.update(
            { libelle: newCategorie.libelle,
              idSpecialite: newCategorie.idSpecialite },
            { where: {id:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Categorie not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Categorie.destroy({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Categorie.. Good.. job?');
            } else
                reject('Categorie not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};