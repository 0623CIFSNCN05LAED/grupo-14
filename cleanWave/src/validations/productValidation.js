const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("name")
    .notEmpty()
    .withMessage("Debes completar el campo de nombre")
    .bail()
    .isLength({ min: 5 })
    .withMessage("El nombre debe tener al menos 5 caracteres"),
  body("shortName")
    .notEmpty()
    .withMessage("Debes completar el campo de nombre abreviado"),
  body("brand_id").notEmpty().withMessage("Debes completar el campo de marca"),
  body("retailPrice")
    .notEmpty()
    .withMessage("Debes completar el campo de precio minorista"),
  body("discountCf")
    .notEmpty()
    .withMessage("Debes completar el campo de descuento Consumidor Final"),
    body("discountM")
    .notEmpty()
    .withMessage("Debes completar el campo de descuento Mayorista"),
  body("wholesalePrice")
    .notEmpty()
    .withMessage("Debes completar el campo de precio mayorista"),
  body("stock").notEmpty().withMessage("Debes completar el campo de stock"),
  body("category_id").notEmpty().withMessage("Debes seleccionar una categoria"),
  body("description")
    .notEmpty()
    .withMessage("Debes completar el campo de descripicion")
    .bail()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),
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
