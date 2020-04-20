// Import function
const Character = require('../../model/characters').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Character.findAll({
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
        Character.findOne({
            where: {
                idCharacters:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Character not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneByUniverseAndUser = async function getOneByUniverseAndUser(idUniverse, idUser){
    return new Promise((resolve, reject) => {
        Character.findAll({
            where: {
                idUniverse: idUniverse,
                id: idUser,
                deleted: null
            }
        })
        .then(allResult => {
            if(allResult) {
                let finalRes = [];
                    for(let res of allResult){
                        finalRes.push(res.dataValues);
                    }
                    resolve(finalRes);
                resolve(allResult);
            } else
                reject('Character not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getAllByIdUniverse = async function getAllByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Character.findAll({
            where: {
                idUniverse:id,
                deleted: null
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Character not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newCharacter){
    return new Promise((resolve, reject) => {
        Character.create(newCharacter)
        .then(character => {
            if(character)
                resolve(character.dataValues);
            else
                reject('Character not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(id, newCharacter){
    return new Promise((resolve, reject) => {
        Character.update(
            { firstname: newCharacter.firstname,
              lastname: newCharacter.lastname,
              gender: newCharacter.gender,
              story: newCharacter.story,
              physical: newCharacter.physical,
              picture: newCharacter.picture,
              checked: newCharacter.checked,
              id: newCharacter.id,
              idType: newCharacter.idType,
              idClass: newCharacter.idClass,
              idNation: newCharacter.idNation,
              updatedAt: newCharacter.updatedAt,
              deleted: newCharacter.deleted },
            { where: {idCharacters:id} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Character not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneById = async function deleteOneById(id){
    return new Promise((resolve, reject) => {
        Character.destroy({
            where: {
                idCharacters:id
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Character.. Good.. job?');
            } else
                reject('Character not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};