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
const productsRouter = require("./productsRouter");
router.use("/products", productsRouter);

module.exports = router;
