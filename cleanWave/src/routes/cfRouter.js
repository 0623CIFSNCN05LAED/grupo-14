/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller Require's ****************/
const mainController = require("../controllers/mainController");

/*************** CF Router ********************/
router.get("/", mainController.homeConsumidorFinal);

/*************** CF Products Router ********************/
const productsCfRouter = require("./productsCfRouter");
router.use("/products", productsCfRouter);

module.exports = router;
