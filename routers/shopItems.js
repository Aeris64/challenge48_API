// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const shopItemsFunction = require('../path/shopkeeper/shopItems');
const moneysFunction = require('../path/money/money');
const shopkeeperFunction = require('../path/shopkeeper/shopkeeper');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    shopItemsFunction.getAll()
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/shops/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    shopItemsFunction.getAllByIdShop(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/shops/:id/link', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    shopItemsFunction.getAllByIdShop(id)
        .then(async (result) => {
            finalRes = [];
            for(let shopItems of result){
                let temp = shopItems.dataValues;
                let money = await moneysFunction.getOneById(temp.idMoney);
                let shopkeeper = await shopkeeperFunction.getOneById(temp.idShopkeeper);
                temp.money = money.dataValues.name;
                temp.shopkeeper = shopkeeper.dataValues.name;
                temp.idUniverse = shopkeeper.dataValues.idUniverse;
                finalRes.push(temp);
            }
            return res.send(finalRes);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.post('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    try{
        req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch(err) {
        req.body = req.body;
    }
    let shopItems = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idItems: req.body.data.idItems,
        number: req.body.data.number,
        unlocked: req.body.data.unlocked
    };

    shopItemsFunction.createOne(shopItems)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.put('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let shopItems = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idItems: req.body.data.idItems,
        number: req.body.data.number,
        unlocked: req.body.data.unlocked
    };

    shopItemsFunction.updateOne(shopItems)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.delete('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let shopItems = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idItems: req.body.data.idItems
    };

    shopItemsFunction.deleteOneByIds(shopItems)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;