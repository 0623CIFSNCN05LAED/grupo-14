/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Controller require ******************/
const productsController = require("../controllers/productsController");

/*************** Get all products ******************/
router.get("", productsController.productsList);

/*************** Get one product ******************/
router.get("/productDetail/:id", productsController.detail);

/*************** Create one product ******************/
router.get("/createProduct", productsController.create);
// POST

/*************** Edit one product ******************/
router.get("/editProduct", productsController.edit);
// PUT

/*************** Delete one product ******************/
// Delete

/*************** Product cart ******************/
router.get("/productCart", productsController.cart);

module.exports = router;
