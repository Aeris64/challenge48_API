// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const usersFunction = require('../path/users/users');
const uuid = require('uuid/v4');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    usersFunction.getAll()
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.post('/login', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    }
    let mail = req.body.data.mail || null;
    let pass = req.body.data.pass || null;

    usersFunction.getOneByAuth(mail, pass)
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

    usersFunction.getOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/pseudo/:pseudo', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    let pseudo = req.params.pseudo;
    if (!pseudo) return res.send(new error.BadRequestError('Pseudo should be initialized'));

    usersFunction.getOneByPseudo(pseudo)
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

    usersFunction.getAllOneUniverseId(id)
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
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    };
    let date = new Date().toJSON().slice(0, 10);

    let user = {
        id: uuid(),
        pseudo: req.body.data.pseudo,
        pass: req.body.data.pass,
        mail: req.body.data.mail,
        createdAt: date,
        deleted: null
    };

    usersFunction.createOne(user)
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
    let user = {
        pass: req.body.data.pass,
        deleted: date || null
    };

    await usersFunction.getOneById(id)
        .then((result) => {
            if(!user.pass) user.pass = result.pass;
            if(!user.deleted) user.deleted = result.deleted;
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });

    usersFunction.updateOne(id, user)
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

    usersFunction.deleteOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;