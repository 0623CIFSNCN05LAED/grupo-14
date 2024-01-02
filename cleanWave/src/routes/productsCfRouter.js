/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const productController = require("../controllers/productController");

/*************** Get all products ******************/
router.get("/", productController.listCf);

/*************** Get one product ******************/
router.get("/detail/:id", productController.detailCf);

/* ************ Search product ******************** */
router.get("/searchProductsCf", productController.searchProductsCf);

module.exports = router;
