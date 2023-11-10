const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("name").notEmpty().withMessage("Debes completar el campo de nombre"),
  body("shortName")
    .notEmpty()
    .withMessage("Debes completar el campo de nombre abreviado"),
  body("brand_id").notEmpty().withMessage("Debes completar el campo de marca"),
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
  body("category_id").notEmpty().withMessage("Debes seleccionar una categoria"),
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
