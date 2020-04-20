// Import function
const StatsSkill = require('../../model/statsSkill').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        StatsSkill.findAll({})
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

exports.getAllByIdSkills = async function getAllByIdSkills(id){
    return new Promise((resolve, reject) => {
        StatsSkill.findAll({
            where: {
                idSkill:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not statsSkill...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};