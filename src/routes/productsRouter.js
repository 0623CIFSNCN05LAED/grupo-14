/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Middlewares require ******************/
const uploadImgProduct = require("../middlewares/multerProduct");
const productMiddleware = require("../middlewares/productMiddleware");
const userAdminMiddleware = require("../middlewares/userAdminMiddleware");

/*************** Validations require ******************/
const productValidation = require("../validations/productValidation");

/*************** Controller require ******************/
const productController = require("../controllers/productController");

/*************** Get all products ******************/
router.get("/", productController.list);

/*************** Get one product ******************/
router.get("/detail/:id", productController.detail);

/*************** Create one product ******************/
router.get("/create", userAdminMiddleware, productController.viewCreate);
router.post(
  "/",
  uploadImgProduct.single("image"),
  productValidation,
  productMiddleware,
  productController.create
);

/*************** Edit one product ******************/
router.get("/edit/:id", productController.viewEdit);
router.put("/:id",
uploadImgProduct.single("image"),
productValidation,
productMiddleware,
productController.edit);

/*************** Delete one product ******************/
router.delete("/:id", productController.delete);

module.exports = router;
