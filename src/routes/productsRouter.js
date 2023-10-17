/*************** Require's ******************/
const { Router } = require("express");
const router = Router();
const { body } = require("express-validator");

/*************** Middlewares require ******************/
const uploadImgProduct = require("../middlewares/multerProduct");

/********** Express validator ****************/

const validations = [
  body("name").notEmpty().withMessage("Debes completar el campo de nombre"),
  body("shortName")
    .notEmpty()
    .withMessage("Debes completar el campo de nombre abreviado"),
  body("brand").notEmpty().withMessage("Debes completar el campo de marca"),
  body("price")
    .notEmpty()
    .withMessage("Debes completar el campo de precio minorista"),
  body("discount")
    .notEmpty()
    .withMessage("Debes completar el campo de descuento"),
  body("preferentialPrice")
    .notEmpty()
    .withMessage("Debes completar el campo de precio mayorista"),
  body("mount").notEmpty().withMessage("Debes completar el campo de stock"),
  body("category").notEmpty().withMessage("Debes seleccionar una categoria"),
  body("description")
    .notEmpty()
    .withMessage("Debes completar el campo de descripicion"),
  body("image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".jpeg"];

    if (!file) {
      throw new Error("Debes subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Debes subir una archivo tipo ${acceptedExtensions.join(", ")}`
        );
      }
    }
    return true;
  }),
];

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
  validations,
  productsController.newProduct
);

/*************** Edit one product ******************/
router.get("/edit/:id", productsController.edit);
router.put("/:id", upload.single("image"), productsController.update);

/*************** Delete one product ******************/
router.delete("/:id", productsController.delete);

/*************** Product cart ******************/
router.get("/cart", productsController.cart);

module.exports = router;
