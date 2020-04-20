// Import function
const ShopStuff = require('../../model/shopStuff').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        ShopStuff.findAll({})
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
        ShopStuff.findAll({
            where: {
                idShopkeeper:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not shopStuff...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newShopStuff){
    return new Promise((resolve, reject) => {
        Stats.create(newShopStuff)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('ShopStuff not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newShopStuff){
    return new Promise((resolve, reject) => {
        Stats.update(
            { number: newShopStuff.number,
              unlocked: newShopStuff.unlocked },
            { where: {  idMoney: newShopStuff.idMoney, 
                        idShopkeeper: newShopStuff.idShopkeeper, 
                        idStuff: newShopStuff.idStuff} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('ShopStuff not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(shopStuff){
    return new Promise((resolve, reject) => {
        Stats.destroy({
            where: {
                idMoney: shopStuff.idMoney,
                idShopkeeper: shopStuff.idShopkeeper,
                idStuff: shopStuff.idStuff,
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some ShopStuff.. Good.. job?');
            } else
                reject('ShopStuff not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};