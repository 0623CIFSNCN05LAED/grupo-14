/*************** Require's ******************/
const { Router } = require("express");
const router = Router();

/*************** Middlewares require ******************/
const uploadImgProduct = require("../middlewares/multerProduct");
const createProductMiddleware = require("../middlewares/createProductMiddleware");
const editProductMiddleware = require("../middlewares/editProductMiddleware");
const userAdminMiddleware = require("../middlewares/userAdminMiddleware");

/*************** Validations require ******************/
const productValidation = require("../validations/productValidation");

/*************** Controller require ******************/
const productController = require("../controllers/productController");

/*************** Create one product ******************/
router.get("/create", userAdminMiddleware, productController.viewCreate);
router.post(
  "/",
  uploadImgProduct.single("image"),
  productValidation,
  createProductMiddleware,
  productController.create
);

/*************** Edit one product ******************/
router.get("/edit/:id", userAdminMiddleware, productController.viewEdit);
router.put(
  "/:id",
  uploadImgProduct.single("image"),
  productValidation,
  editProductMiddleware,
  productController.edit
);

/*************** Delete one product ******************/
router.delete("/:id", productController.delete);

// /* ************ Search product ******************** */
// router.get("/searchProducts", productController.searchProducts)

module.exports = router;
