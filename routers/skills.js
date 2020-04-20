// Import module
const router = require('express').Router();
const error = require('../errors/notFound');
const uuid = require('uuid/v4');

// Import model
const skillFunction = require('../path/skill/skill');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    skillFunction.getAll()
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

    skillFunction.getOneById(id)
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

    skillFunction.getAllByIdUniverse(id)
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
    let skill = {
        idSkill: uuid(),
        name: req.body.data.name,
        libelle: req.body.data.libelle,
        order: req.body.data.order,
        unlocked: req.body.data.unlocked,
        price: req.body.data.price,
        idTypeSkill: req.body.data.idTypeSkill,
        idUniverse: req.body.data.idUniverse,
        deleted: null
    };

    skillFunction.createOne(skill)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
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
    let skill = {
        name: req.body.data.name,
        libelle: req.body.data.libelle,
        order: req.body.data.order,
        unlocked: req.body.data.unlocked,
        price: req.body.data.price,
        idTypeSkill: req.body.data.idTypeSkill,
        deleted: date || null
    }

    await skillFunction.getOneById(id)
        .then((result) => {
            if(!skill.name) skill.name = result.name;
            if(!skill.libelle) skill.libelle = result.libelle;
            if(!skill.order) skill.order = result.order;
            if(skill.unlocked == undefined) skill.unlocked = result.unlocked;
            if(!skill.price) skill.price = result.price;
            if(!skill.idTypeSkill) skill.idTypeSkill = result.idTypeSkill;
            if(!skill.deleted) skill.deleted = result.deleted;
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });

    skillFunction.updateOne(id, skill)
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

    skillFunction.deleteOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;