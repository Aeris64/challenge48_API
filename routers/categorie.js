// Import module
const router = require('express').Router();
const error = require('../errors/notFound');
const uuid = require('uuid/v4');

// Import model
const categorieFunction = require('../path/categorie/categorie');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    categorieFunction.getAll()
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    statsFunction.getOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/universes/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    statsFunction.getAllByIdUniverse(id)
        .then((result) => {
            return res.send(result);
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
    let stats = {
        idStats: uuid(),
        name: req.body.data.name,
        order: req.body.data.order,
        idUniverse: req.body.data.idUniverse,
        deleted: null
    };

    statsFunction.createOne(stats)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.post('/characters/:id', async (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    try{
        req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch(err) {
        req.body = req.body;
    }
    let idUniverse = req.body.data.idUniverse;
    if(!req.body.data.idUniverse) return res.send(new error.BadRequestError(err));

    let allMyStat = new Map();

    let allStatsUniv = await statsFunction.getAllByIdUniverse(idUniverse)
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
    for(let stats of allStatsUniv){
        allMyStat.set(stats.dataValues.idStats, 0);
    }

    let resStatLearn = await statsLearnFunction.getAllByIdCharacters(id)
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
    for(let stats of resStatLearn){
        allMyStat.set(stats.dataValues.idStats, stats.dataValues.number);
    }

    let resBagCharac = await bagFunction.getAllByIdCharacters(id)
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
    for(let bag of resBagCharac){
        let resStatGive = await statsGiveFunction.getAllByIdStuffs(bag.dataValues.idStuff)
            .catch((err) => {
                return res.send(new error.NotFoundError(err));
            });
        for(let stats of resStatGive){
            if(allMyStat.has(stats.dataValues.idStats)){
                let nb = parseFloat(stats.dataValues.number);
                nb = nb + parseFloat(allMyStat.get(stats.dataValues.idStats));
                allMyStat.set(stats.dataValues.idStats, nb);
            }
        }
    }

    let finalRes = [];
    for(let stats of allStatsUniv){
        let temp = stats.dataValues;
        temp.number = allMyStat.get(stats.idStats);
        finalRes.push(temp);
    }
    return res.send(finalRes);
});

router.put('/:id', async (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let date = null;
    if(req.body.data.deleted){
        date = new Date().toJSON().slice(0, 10);
    }
    let stats = {
        name: req.body.data.name,
        order: req.body.data.order,
        deleted: date || null
    };

    await statsFunction.getOneById(id)
        .then((result) => {
            if(!stats.name) stats.name = result.name;
            if(!stats.order) stats.order = result.order;
            if(!stats.deleted) stats.deleted = result.deleted;
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });

    statsFunction.updateOne(id, stats)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.delete('/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    statsFunction.deleteOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;