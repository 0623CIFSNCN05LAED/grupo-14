const { Router } = require("express");
const router = Router();

const productsController = require("../controllers/productsController");

router.get("/products/productDetail", productsController.detail);

module.exports = router;
