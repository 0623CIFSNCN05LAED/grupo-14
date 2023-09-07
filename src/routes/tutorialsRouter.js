const { Router } = require("express");
const router = Router();

const tutorialsController = require("../controllers/tutorialsController")

router.get("/tutorials", tutorialsController.home);

router.get("/tutorials/tutorial1", tutorialsController.tutorial1);

router.get("/tutorials/tutorial2", tutorialsController.tutorial2);

module.exports = router;