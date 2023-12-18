/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Middlewares require ******************/
const userCfCanNotPass = require("../middlewares/userCfMiddleware");

/*************** Controller require ******************/
const productController = require("../controllers/productController");

/*************** Get all products ******************/
router.get("/", userCfCanNotPass, productController.listM);

/*************** Get one product ******************/
router.get("/detail/:id", userCfCanNotPass, productController.detailM);

module.exports = router;
