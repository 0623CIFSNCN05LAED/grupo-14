/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Middlewares require ******************/
const uploadImgProduct = require("../middlewares/multerProduct");
const productMiddleware = require("../middlewares/productMiddleware");

/*************** Validations require ******************/
const productValidation = require("../validations/productValidation");

/*************** Controller require ******************/
const productsController = require("../controllers/productsController");

/*************** Get all products ******************/
router.get("/", productsController.productsList);

/*************** Get one product ******************/
router.get("/detail/:id", productsController.detail);

/*************** Create one product ******************/
router.get("/create", productsController.create);
router.post(
  "/",
  uploadImgProduct.single("image"),
  productValidation,
  productMiddleware,
  productsController.newProduct
);

/*************** Edit one product ******************/
router.get("/edit/:id", productsController.edit);
router.put(
  "/:id",
  uploadImgProduct.single("image"),
  productValidation,
  productMiddleware,
  productsController.update
);

/*************** Delete one product ******************/
router.delete("/:id", productsController.delete);

/*************** Product cart ******************/
router.get("/cart", productsController.cart);

module.exports = router;
