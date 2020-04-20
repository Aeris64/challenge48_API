const router = require('express').Router();

const clientRouter = require('./routers/client');
const offreRouter = require('./routers/offre');
const categorieRouter = require('./routers/categorie');
const specialiteRouter = require('./routers/specialite');

router.use('/clients', clientRouter);
router.use('/offres', offreRouter);
router.use('/categories', categorieRouter);
router.use('/specialites', specialiteRouter);

module.exports = router;