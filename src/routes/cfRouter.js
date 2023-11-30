/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller Require's ****************/
const mainController = require("../controllers/mainController");

/*************** Middlewares require ******************/
const userMCanNotPass = require("../middlewares/userMMiddleware");

/*************** CF Router ********************/
router.get("/", userMCanNotPass, mainController.homeConsumidorFinal);

/*************** Products Router ********************/
const productsRouter = require("./productsRouter");
router.use("/products", productsRouter);

module.exports = router;
