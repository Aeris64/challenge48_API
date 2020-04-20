// Import function
const Specialite = require('../../model/specialite').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Specialite.findAll({})
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
        Specialite.findOne({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Specialite not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newSpecialite){
    return new Promise((resolve, reject) => {
        Specialite.create(newSpecialite)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Specialite not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newSpecialite){
    return new Promise((resolve, reject) => {
        Specialite.update(
            { libelle: newSpecialite.libelle },
            { where: {id:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Specialite not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Specialite.destroy({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Specialite.. Good.. job?');
            } else
                reject('Specialite not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};