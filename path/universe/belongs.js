// Import function
const Belongs = require('../../model/belongs').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
            Belongs.findAll({})
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

exports.getOneByIdUniverse = async function getOneByIdUniverse(id){
    return new Promise((resolve, reject) => {
        Belongs.findAll({
            where: {
                idUniverse:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not belongs...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.getOneByIdUser = async function getOneByIdUser(id){
    return new Promise((resolve, reject) => {
        Belongs.findAll({
            where: {
                id:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not belongs...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newBelongs){
    return new Promise((resolve, reject) => {
        Belongs.create(newBelongs)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Belongs not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newBelongs){
    return new Promise((resolve, reject) => {
        Belongs.update(
            { idRights: newBelongs.idRights },
            { where: {id:newBelongs.id, idUniverse:newBelongs.idUniverse} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('Belong not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(belongs){
    return new Promise((resolve, reject) => {
        Belongs.destroy({
            where: {
                id:belongs.id,
                idUniverse:belongs.idUniverse
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some Belong.. Good.. job?');
            } else
                reject('Belong not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};