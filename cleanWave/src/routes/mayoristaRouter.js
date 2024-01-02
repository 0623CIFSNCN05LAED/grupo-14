/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller Require's ****************/
const mainController = require("../controllers/mainController");

/*************** Mayorista Router *******************/
router.get("/", mainController.homeMayorista);

/*************** Products Router ********************/
const productsMRouter = require("./productsMRouter");
router.use("/products", productsMRouter);


module.exports = router;
