// Import function
const Types = require('../../model/type').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        Types.findAll({})
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
        Types.findOne({
            where: {
                idType:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Type not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};