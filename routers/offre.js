// Import module
const router = require('express').Router();
const error = require('../errors/notFound');
const uuid = require('uuid/v4');

// Import model
const offreFunction = require('../path/offre/offre');
const categorieFunction = require('../path/categorie/categorie');
const specialiteFunction = require('../path/categorie/specialite');
const clientFunction = require('../path/client/client');

const nbKm = 1;

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    offreFunction.getAll()
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/around/link', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));

    // -> remove commentaire for test local
    // req.body.data = {};
    if(!req.body.data) return res.send(new error.BadRequestError('Need position'));

    let myPos = {
        lat: req.body.data.lat || 44.870168199,
        long: req.body.data.long || -0.551752599
    }
    
    offreFunction.getAll()
        .then(async (result) => {
            let finalRes = [];
            for(let res of result){
                let client = await clientFunction.getOneById(res.idClient);
                let testLat = client.dataValues.position_LAT;
                let testLong = client.dataValues.position_LONG;
                let calcul = Math.acos(Math.sin(myPos.lat*(Math.PI / 180))*Math.sin(testLat*(Math.PI / 180))+Math.cos(myPos.lat*(Math.PI / 180))*Math.cos(testLat*(Math.PI / 180))*Math.cos(myPos.long*(Math.PI/180)-testLong*(Math.PI/180)))*6371
                if(calcul < nbKm){
                    let temp = res;
                    let categorie = await categorieFunction.getOneById(temp.id);
                    let specialite = await specialiteFunction.getOneById(categorie.dataValues.idSpecialite);
                    temp.client = client.dataValues;
                    temp.categorie = categorie.dataValues;
                    temp.categorie.specialite = specialite.dataValues.libelle;
                    temp.idClient = undefined;
                    temp.idCateg = undefined;
                    finalRes.push(temp);
                }
            }
            return res.send(finalRes);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/link', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    offreFunction.getAll()
        .then(async (result) => {
            let finalRes = [];
            for(let res of result){
                let temp = res;
                let client = await clientFunction.getOneById(temp.idClient);
                let categorie = await categorieFunction.getOneById(temp.id);
                let specialite = await specialiteFunction.getOneById(categorie.dataValues.idSpecialite);
                temp.client = client.dataValues;
                temp.categorie = categorie.dataValues;
                temp.categorie.specialite = specialite.dataValues.libelle;
                temp.idClient = undefined;
                temp.idCateg = undefined;
                finalRes.push(temp);
            }
            return res.send(finalRes);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    offreFunction.getOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

router.get('/:id/link', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;

    offreFunction.getOneById(id)
        .then(async (result) => {
            if(!result.dataValues) return res.send(new error.NotFoundError('Offre not found...'));
            let finalRes = result.dataValues;
            let client = await clientFunction.getOneById(finalRes.idClient);
            let categorie = await categorieFunction.getOneById(finalRes.id);
            let specialite = await specialiteFunction.getOneById(categorie.dataValues.idSpecialite);
            finalRes.client = client.dataValues;
            finalRes.categorie = categorie.dataValues;
            finalRes.categorie.specialite = specialite.dataValues.libelle;
            finalRes.idClient = undefined;
            finalRes.idCateg = undefined;
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
    let offre = {
        id: uuid(),
        idClient: req.body.data.idClient,
        idCateg: req.body.data.idCateg,
        libelle: req.body.data.libelle,
        payant: req.body.data.payant,
        horaires: req.body.data.horaires
    };

    offreFunction.createOne(offre)
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
    let offre = {
        libelle: req.body.data.libelle,
        payant: req.body.data.payant,
        horaires: req.body.data.horaires
    };

    await offreFunction.getOneById(id)
        .then((result) => {
            if(!offre.libelle) offre.libelle = result.libelle;
            if(!offre.payant) offre.payant = result.payant;
            if(!offre.horaires) offre.horaires = result.horaires;
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });

    offreFunction.updateOne(id, offre)
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

    offreFunction.deleteOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;