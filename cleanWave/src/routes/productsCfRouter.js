/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Middlewares require ******************/
const userMCanNotPass = require("../middlewares/userMMiddleware");

/*************** Controller require ******************/
const productController = require("../controllers/productController");

/*************** Get all products ******************/
router.get("/", userMCanNotPass, productController.listCf);

/*************** Get one product ******************/
router.get("/detail/:id", userMCanNotPass, productController.detailCf);

/* ************ Search product ******************** */
router.get("/searchProductsCf", productController.searchProductsCf);

module.exports = router;
