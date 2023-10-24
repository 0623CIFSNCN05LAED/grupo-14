const { body } = require("express-validator");
const path = require("path");

module.exports = [
  body("name").notEmpty().withMessage("Debes completar el campo de nombre"),
  body("lastName")
    .notEmpty()
    .withMessage("Debes completar el campo de nombre "),
  body("dni").notEmpty().withMessage("Debes completar el campo de "),
  body("tel").notEmpty().withMessage("Debes completar el campo de "),
  body("email")
    .notEmpty()
    .withMessage("Debes introducir una dirección de correo eléctronico")
    .bail()
    .isEmail()
    .withMessage("Debes introducir un formato de correo eléctronico válido"),
  body("password").notEmpty().withMessage("Debes completar el campo de "),
  body("address").notEmpty().withMessage("Debes completar el campo de "),
  body("location").notEmpty().withMessage("Debes seleccionar una "),
  body("cp").notEmpty().withMessage("Debes completar el campo de "),
  body("province").notEmpty().withMessage("Debes completar el campo de "),
  body("country").notEmpty().withMessage("Debes completar el campo de "),
];
