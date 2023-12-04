/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller Require's ****************/
const mainController = require("../controllers/mainController");

/*************** Middlewares require ******************/
const userCfCanNotPass = require("../middlewares/userCfMiddleware");

/*************** Mayorista Router *******************/
router.get("/", userCfCanNotPass, mainController.homeMayorista);

/*************** Products Router ********************/
const productsMRouter = require("./productsMRouter");
router.use("/products", productsMRouter);

module.exports = router;
