// Import function
const Skills = require('../../model/skill').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Skills.findAll({
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
                resolve(false);
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneById = async function getOneById(id){
    return new Promise((resolve, reject) => {
        Skills.findOne({
            where: {
                idSkill:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Skill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Skills.findAll({
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
                reject('Skill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newSkill){
    return new Promise((resolve, reject) => {
        Skills.create(newSkill)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Skill not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newSkill){
    return new Promise((resolve, reject) => {
        Skills.update(
            { name: newSkill.name,
              libelle: newSkill.libelle,
              order: newSkill.order,
              unlocked: newSkill.unlocked,
              price: newSkill.price,
              idTypeSkill: newSkill.idTypeSkill,
              deleted: newSkill.deleted },
            { where: {idSkill:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Skill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Skills.destroy({
            where: {
                idSkill:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Skill.. Good.. job?');
            } else
                reject('Skill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};