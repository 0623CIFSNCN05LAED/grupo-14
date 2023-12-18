/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const aboutController = require("../controllers/aboutController");

/*************** Us ******************/
router.get("/nosotros", aboutController.nosotros);

/*************** Contact ******************/
router.get("/contacto", aboutController.contacto);

module.exports = router;
