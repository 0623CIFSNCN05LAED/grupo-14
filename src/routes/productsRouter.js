const { Router } = require("express");
const router = Router();

const productsController = require("../controllers/productsController");

router.get("/products/productDetail/:id", productsController.detail);
router.get("/products/productCart", productsController.cart);
router.get("/products/createProduct", productsController.create);
router.get("/products/productList", productsController.productsList);

module.exports = router;
