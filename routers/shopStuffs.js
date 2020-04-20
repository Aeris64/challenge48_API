// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const shopStuffFunction = require('../path/shopkeeper/shopStuff');
const moneysFunction = require('../path/money/money');
const shopkeeperFunction = require('../path/shopkeeper/shopkeeper');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    shopStuffFunction.getAll()
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

    shopStuffFunction.getAllByIdShop(id)
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

    shopStuffFunction.getAllByIdShop(id)
        .then(async (result) => {
            finalRes = [];
            for(let shopStuff of result){
                let temp = shopStuff.dataValues;
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
    let shopStuff = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idStuff: req.body.data.idStuff,
        number: req.body.data.number,
        unlocked: req.body.data.unlocked
    };

    shopStuffFunction.createOne(shopStuff)
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
    let shopStuff = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idStuff: req.body.data.idStuff,
        number: req.body.data.number,
        unlocked: req.body.data.unlocked
    };

    shopStuffFunction.updateOne(shopStuff)
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
    let shopStuff = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idStuff: req.body.data.idStuff
    };

    shopStuffFunction.deleteOneByIds(shopStuff)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;