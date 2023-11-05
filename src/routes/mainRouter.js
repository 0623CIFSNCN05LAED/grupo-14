/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller Require's ****************/
const mainController = require("../controllers/mainController");

/*************** Middlewares require ******************/
const userCfCanNotPass = require("../middlewares/userCfMiddleware");
const userMCanNotPass = require("../middlewares/userMMiddleware");

/*************** Main Router *******************/
router.get("/", userCfCanNotPass, mainController.homeMayorista); //aca va el url entre ''
router.get("/mayorista", userCfCanNotPass, mainController.homeMayorista);
router.get("/cf", userMCanNotPass, mainController.homeConsumidorFinal);

/*************** Products Router ********************/
const productsRouter = require("./productsRouter");
router.use("/products", productsRouter);

/*************** Users Router **********************/
const userRouter = require("./userRouter");
router.use("/users", userRouter);

/************** About Router **********************/
const aboutRouter = require("./aboutRouter");
router.use("/about", aboutRouter);

/************** Tutorials Router ******************/
const tutorialsRouter = require("./tutorialsRouter");
router.use("/tutorials", tutorialsRouter);

module.exports = router;
