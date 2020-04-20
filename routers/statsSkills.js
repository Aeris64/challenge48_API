// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const statsSkillFunction = require('../path/stats/statsSkill');
const statsFunction = require('../path/stats/stats');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    statsSkillFunction.getAll()
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/skills/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    let id = req.params.id;

    statsSkillFunction.getAllByIdSkills(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/skills/:id/link', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    let id = req.params.id;

    statsSkillFunction.getAllByIdSkills(id)
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
    let statsSkill = {
        idSkill: req.body.data.idSkill,
        idStats: req.body.data.idStats,
        number: req.body.data.number
    };

    statsSkillFunction.createOne(statsSkill)
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
    let statsSkill = {
        idSkill: req.body.data.idSkill,
        idStats: req.body.data.idStats,
        number: req.body.data.number
    };

    statsSkillFunction.updateOne(statsSkill)
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
    let statsSkill = {
        idSkill: req.body.data.idSkill,
        idStats: req.body.data.idStats
    };

    statsSkillFunction.deleteOneByIds(statsSkill)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;