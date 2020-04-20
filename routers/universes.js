// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const universeFunction = require('../path/universe/universe');
const belongsFunction = require('../path/universe/belongs');
const uuid = require('uuid/v4');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    universeFunction.getAll()
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

    universeFunction.getOneById(id)
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
    let id = req.body.data.id;
    let date = new Date().toJSON().slice(0, 10);

    let universe = {
        idUniverse: uuid(),
        name: req.body.data.name,
        createdAt: date,
        deleted: null
    };

    universeFunction.createOne(universe)
        .then((result) => {
            let belongs = {
                idRights : 1,
                id: id,
                idUniverse: result.idUniverse
            };
        
            belongsFunction.createOne(belongs)
                .then((result) => {
                    return res.send(result);
                })
                .catch((err) => {
                    return res.send(new error.NotFoundError(err));
                });
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
    let universe = {
        name: req.body.data.name,
        deleted: date || null
    };

    await universeFunction.getOneById(id)
        .then((result) => {
            if(!universe.name) universe.name = result.name;
            if(!universe.deleted) universe.deleted = result.deleted;
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });

    universeFunction.updateOne(id, universe)
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

    universeFunction.deleteOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;