// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const statsGiveFunction = require('../path/stats/statsGive');
const statsFunction = require('../path/stats/stats');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    statsGiveFunction.getAll()
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/stuffs/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    statsGiveFunction.getAllByIdStuffs(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/stuffs/:id/link', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    statsGiveFunction.getAllByIdStuffs(id)
        .then(async (result) => {
            finalRes = [];
            for(let statGive of result){
                let temp = statGive.dataValues;
                let stat = await statsFunction.getOneById(temp.idStats);
                temp.name = stat.dataValues.name;
                temp.idUniverse = stat.dataValues.idUniverse;
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
    let statsGive = {
        idStuff: req.body.data.idStuff,
        idStats: req.body.data.idStats,
        number: req.body.data.number
    };

    statsGiveFunction.createOne(statsGive)
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
    let statsGive = {
        idStuff: req.body.data.idStuff,
        idStats: req.body.data.idStats,
        number: req.body.data.number
    };

    statsGiveFunction.updateOne(statsGive)
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
    let statsGive = {
        idStuff: req.body.data.idStuff,
        idStats: req.body.data.idStats
    };

    statsGiveFunction.deleteOneByIds(statsGive)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;