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
const productDBcontroller = require("../controllers/productDBcontroller");

/*************** Get all products ******************/
router.get("/", productDBcontroller.list);

/*************** Get one product ******************/
router.get("/detail/:id", productDBcontroller.detail);

/*************** Create one product ******************/
router.get("/create", userAdminMiddleware, productsController.create);
router.get("/create", productDBcontroller.viewCreate);
router.post(
  "/",
  uploadImgProduct.single("image"),
  productValidation,
  productMiddleware,
  productDBcontroller.create
);

/*************** Edit one product ******************/
router.get("/edit/:id", userAdminMiddleware, productsController.edit);
router.put("/:id", uploadImgProduct.single("image"), productsController.update);
router.get("/edit/:id", productDBcontroller.viewEdit);
router.put("/:id", uploadImgProduct.single("image"), productDBcontroller.edit);

/*************** Delete one product ******************/
router.delete("/:id", productDBcontroller.delete);

/*************** Product cart ******************/
router.get("/cart", productDBcontroller.cart);

module.exports = router;
