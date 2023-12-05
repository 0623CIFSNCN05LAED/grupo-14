const { body } = require("express-validator");

module.exports = [
  body("country").notEmpty().withMessage("Debes completar el campo país"),
  body("province").notEmpty().withMessage("Debes completar el campo provincia"),
  body("neighborhood")
    .notEmpty()
    .withMessage("Debes completar el campo localidad"),
  body("street").notEmpty().withMessage("Debes completar el campo calle"),
  body("number").notEmpty().withMessage("Debes completar el campo numeración"),
  body("apartament")
    .notEmpty()
    .withMessage("Debes completar el campo piso - departamento"),
  body("note").notEmpty().withMessage("Debes completar el campo descripción"),
];
