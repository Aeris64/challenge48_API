// Import function
const TypeSkills = require('../../model/typeSkill').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        TypeSkills.findAll({
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
        TypeSkills.findOne({
            where: {
                idTypeSkill:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('TypeSkill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        TypeSkills.findAll({
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
                reject('TypeSkills not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newTypeSkill){
    return new Promise((resolve, reject) => {
        TypeSkills.create(newTypeSkill)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('TypeSkill not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newTypeSkill){
    return new Promise((resolve, reject) => {
        TypeSkills.update(
            { name: newTypeSkill.name,
              libelle: newTypeSkill.libelle,
              order: newTypeSkill.order,
              deleted: newTypeSkill.deleted },
            { where: {idTypeSkill:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('TypeSkill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        TypeSkills.destroy({
            where: {
                idTypeSkill:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some TypeSkill.. Good.. job?');
            } else
                reject('TypeSkill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};