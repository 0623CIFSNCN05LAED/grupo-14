const { Router } = require('express');
const router = Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.homeMayorista); //aca va el url entre ''
router.get('/mayorista', mainController.homeMayorista);
router.get('/cf', mainController.homeConsumidorFinal)

module.exports = router;