/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const productController = require("../controllers/productController");

/*************** Get all products ******************/
router.get("/", productController.listM);

/*************** Get one product ******************/
router.get("/detail/:id", productController.detailM);

/* ************ Search product ******************** */
router.get("/searchProductsM", productController.searchProductsM);

module.exports = router;
