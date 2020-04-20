// Import function
const ShopItems = require('../../model/shopItems').module;

exports.getAll = async function getAll(){
    return new Promise((resolve, reject) => {
        ShopItems.findAll({})
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
        ShopItems.findAll({
            where: {
                idShopkeeper:id
            }
        })
        .then(result => {
            if(result) {
                resolve(result);
            } else
                reject('Not shopItems...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.createOne = async function createOne(newShopItems){
    return new Promise((resolve, reject) => {
        Stats.create(newShopItems)
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('ShopItems not create...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.updateOne = async function updateOne(newShopItems){
    return new Promise((resolve, reject) => {
        Stats.update(
            { number: newShopItems.number,
              unlocked: newShopItems.unlocked },
            { where: {  idMoney: newShopItems.idMoney, 
                        idShopkeeper: newShopItems.idShopkeeper, 
                        idItems: newShopItems.idItems} })
        .then(result => {
            if(result)
                resolve(result.dataValues);
            else
                reject('ShopItems not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};

exports.deleteOneByIds = async function deleteOneByIds(shopItems){
    return new Promise((resolve, reject) => {
        Stats.destroy({
            where: {
                idMoney: shopItems.idMoney,
                idShopkeeper: shopItems.idShopkeeper,
                idItems: shopItems.idItems,
            }
        })
        .then(result => {
            if(result) {
                resolve('You have destroy sucessfully some ShopItems.. Good.. job?');
            } else
                reject('ShopItems not found...');
        }).catch(err => {
            console.log('error', err);
            reject(err);
        });
    });
};