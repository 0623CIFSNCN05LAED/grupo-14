const { body } = require("express-validator");

module.exports = [
  body("country").notEmpty().withMessage("Debes completar el campo país"),
  body("province").notEmpty().withMessage("Debes completar el campo provincia"),
  body("neighborhood")
    .notEmpty()
    .withMessage("Debes completar el campo localidad"),
  body("street").notEmpty().withMessage("Debes completar el campo calle"),
  body("number").notEmpty().withMessage("Debes completar el campo numeración"),
  body("note")
    .notEmpty()
    .withMessage("Debes completar el campo referencias del domicilio")
    .bail()
    .isLength({ min: 5 })
    .withMessage("La descripción debe tener al menos 5 caracteres"),
];
