const { Router } = require("express");
const router = Router();

const productsController = require("../controllers/productsController");

router.get("/productDetail/:id", productsController.detail);
router.get("/productCart", productsController.cart);
router.get("/createProduct", productsController.create);
router.get("/editProduct", productsController.edit);
router.get("/productList", productsController.productsList);

module.exports = router;
