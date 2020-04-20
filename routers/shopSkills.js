// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const shopSkillFunction = require('../path/shopkeeper/shopSkill');
const moneysFunction = require('../path/money/money');
const shopkeeperFunction = require('../path/shopkeeper/shopkeeper');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    shopSkillFunction.getAll()
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

    shopSkillFunction.getAllByIdShop(id)
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

    shopSkillFunction.getAllByIdShop(id)
        .then(async (result) => {
            finalRes = [];
            for(let shopSkill of result){
                let temp = shopSkill.dataValues;
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
    let shopSkill = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idSkill: req.body.data.idSkill,
        number: req.body.data.number,
        unlocked: req.body.data.unlocked
    };

    shopSkillFunction.createOne(shopSkill)
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
    let shopSkill = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idSkill: req.body.data.idSkill,
        number: req.body.data.number,
        unlocked: req.body.data.unlocked
    };

    shopSkillFunction.updateOne(shopSkill)
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
    let shopSkill = {
        idMoney: req.body.data.idMoney,
        idShopkeeper: req.body.data.idShopkeeper,
        idSkill: req.body.data.idSkill
    };

    shopSkillFunction.deleteOneByIds(shopSkill)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;