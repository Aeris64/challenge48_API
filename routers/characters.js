// Import module
const router = require('express').Router();
const error = require('../errors/notFound');
const uuid = require('uuid/v4');

// Import model
const characterFunction = require('../path/character/character');
const classFunction = require('../path/class/class');
const nationFunction = require('../path/nation/nation');
const typeFunction = require('../path/type/type');
// const sequelizeConnection = require('../login/loginBDD').login;

router.get('/', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    characterFunction.getAll()
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

    characterFunction.getOneById(id)
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

    characterFunction.getOneById(id)
        .then(async (result) => {
            if(!result.dataValues) return res.send(new error.NotFoundError('Characters not found...'));
            let finalRes = result.dataValues;
            let type = await typeFunction.getOneById(finalRes.idType);
            let someClass = await classFunction.getOneById(finalRes.idClass);
            let nation = await nationFunction.getOneById(finalRes.idNation);
            finalRes.type = type.dataValues.name;
            finalRes.className = someClass.dataValues.name;
            finalRes.nationName = nation.dataValues.name;
            return res.send(finalRes);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
    // sequelizeConnection.query('SELECT Characters.idCharacters, firstname, lastname, gender, story, physical, picture, Nation.name as nation, Class.name as class, Stats.name as Stats, StatsLearn.number as number FROM Characters '
    //         +'INNER JOIN Nation ON Nation.idNation = Characters.idNation '
    //         +'INNER JOIN Class ON Class.idClass = Characters.idClass '
    //         +'INNER JOIN StatsLearn ON StatsLearn.idCharacters = Characters.idCharacters '
    //         +'INNER JOIN Stats ON Stats.idStats = StatsLearn.idStats '
    //         +'WHERE Characters.idCharacters = ?', { 
    //         replacements: [id],
    //         type: sequelizeConnection.QueryTypes.SELECT 
    //     }
    // ).then(result => {
    //     console.log(result)
    // })
});

router.post('/users/:id', (req, res, next) => {
    let myAuth = new error.KeyAuthentifictaion(req.query.key);
    if(!myAuth.authentifictaion()) return res.send(new error.BadRequestError('Bad API Key'));
    
    let id = req.params.id;
    
    try{
        req.body = JSON.parse(Object.keys(req.body)[0])
    } catch(err) {
        req.body = req.body
    };
    let idUniverse = req.body.data.idUniverse || -1;

    characterFunction.getOneByUniverseAndUser(idUniverse, id)
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

    characterFunction.getAllByIdUniverse(id)
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
    };
    let date = new Date().toJSON().slice(0, 10);
    let character = {
        idCharacters: uuid(),
        firstname: req.body.data.firstname,
        lastname: req.body.data.lastname,
        gender: req.body.data.gender,
        story: req.body.data.story,
        physical: req.body.data.physical,
        picture: req.body.data.picture,
        checked: req.body.data.checked || 0,
        id: req.body.data.id,
        idUniverse: req.body.data.idUniverse,
        idType: req.body.data.idType,
        idClass: req.body.data.idClass,
        idNation: req.body.data.idNation,
        createdAt: date,
        updateAt: date,
        deleted: null
    };

    characterFunction.createOne(character)
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
    let character = {
        firstname: req.body.data.firstname,
        lastname: req.body.data.lastname,
        gender: req.body.data.gender,
        story: req.body.data.story,
        physical: req.body.data.physical,
        picture: req.body.data.picture,
        checked: req.body.data.checked,
        id: req.body.data.id,
        idType: req.body.data.idType,
        idClass: req.body.data.idClass,
        idNation: req.body.data.idNation,
        updateAt: (new Date().toJSON().slice(0, 10)),
        deleted: date || null
    };

    await characterFunction.getOneById(id)
        .then((result) => {
            if(!character.firstname) character.firstname = result.firstname;
            if(!character.lastname) character.lastname = result.lastname;
            if(!character.gender) character.gender = result.gender;
            if(!character.story) character.story = result.story;
            if(!character.physical) character.physical = result.physical;
            if(!character.picture) character.picture = result.picture;
            if(character.checked == undefined) character.checked = result.checked;
            if(!character.id) character.id = result.id;
            if(!character.idType) character.idType = result.idType;
            if(!character.idClass) character.idClass = result.idClass;
            if(!character.idNation) character.idNation = result.idNation;
            if(!character.deleted) character.deleted = result.deleted;
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });

    characterFunction.updateOne(id, character)
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

    characterFunction.deleteOneById(id)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res.send(new error.NotFoundError(err));
        });
});

module.exports = router;