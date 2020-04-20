// Import function
const ShopSkill = require('../../model/shopSkill').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        ShopSkill.findAll({})
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

exports.getAllByIdShop = async function getAllByIdShop(id){
    return new Promise((resolve, reject) => {
        ShopSkill.findAll({
            where: {
                idShopkeeper:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not shopSkill...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newShopSkill){
    return new Promise((resolve, reject) => {
        Stats.create(newShopSkill)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('ShopSkill not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newShopSkill){
    return new Promise((resolve, reject) => {
        Stats.update(
            { number: newShopSkill.number,
              unlocked: newShopSkill.unlocked },
            { where: {  idMoney: newShopSkill.idMoney, 
                        idShopkeeper: newShopSkill.idShopkeeper, 
                        idSkill: newShopSkill.idSkill} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('ShopSkill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(shopSkill){
    return new Promise((resolve, reject) => {
        Stats.destroy({
            where: {
                idMoney: shopSkill.idMoney,
                idShopkeeper: shopSkill.idShopkeeper,
                idSkill: shopSkill.idSkill,
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some ShopSkill.. Good.. job?');
            } else
                reject('ShopSkill not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};