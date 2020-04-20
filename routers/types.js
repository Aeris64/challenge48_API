// Import module
const router = require('express').Router();
const error = require('../errors/notFound');

// Import model
const typeFunction = require('../path/type/type');

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    typeFunction.getAll()
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

    typeFunction.getOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;