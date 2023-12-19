/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const tutorialsController = require("../controllers/tutorialsController");

/*************** Tutorials ******************/
router.get("/", tutorialsController.home);
router.get("/tutorial1", tutorialsController.tutorial1);
router.get("/tutorial2", tutorialsController.tutorial2);

module.exports = router;
