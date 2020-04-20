// Import module
const router = require('express').Router();
const error = require('../errors/notFound');
const uuid = require('uuid/v4');

// Import model
const stuffFunction = require('../path/stuff/stuff');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    stuffFunction.getAll()
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

    stuffFunction.getOneById(id)
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

    stuffFunction.getAllByIdUniverse(id)
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
    let stuff = {
        idStuff: uuid(),
        name: req.body.data.name,
        libelle: req.body.data.libelle,
        unlocked: req.body.data.unlocked,
        number: req.body.data.number,
        idSlot: req.body.data.idSlot,
        idUniverse: req.body.data.idUniverse,
        deleted: null
    };

    stuffFunction.createOne(stuff)
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
    let stuff = {
        name: req.body.data.name,
        libelle: req.body.data.libelle,
        unlocked: req.body.data.unlocked,
        number: req.body.data.number,
        idSlot: req.body.data.idSlot,
        deleted: date || null
    }

    await stuffFunction.getOneById(id)
        .then((result) => {
            if(!stuff.name) stuff.name = result.name;
            if(!stuff.libelle) stuff.libelle = result.libelle;
            if(stuff.unlocked == undefined) stuff.unlocked = result.unlocked;
            if(!stuff.number) stuff.number = result.number;
            if(!stuff.idSlot) stuff.idSlot = result.idSlot;
            if(!stuff.deleted) stuff.deleted = result.deleted;
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });

    stuffFunction.updateOne(id, stuff)
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

    stuffFunction.deleteOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;