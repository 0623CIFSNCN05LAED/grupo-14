/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const userController = require("../controllers/userController");

/*************** Login form ******************/
router.get("/login", userController.login);

/*************** Register forms ******************/
router.get("/registerCf", userController.registerCf);
router.get("/registerMayorista", userController.registerMayorista);

module.exports = router;
