const { body } = require("express-validator");

module.exports = [
  body("address")
    .notEmpty()
    .withMessage("Debes completar el campo de dirección."),
  body("location").notEmpty().withMessage("Debes seleccionar una localidad."),
  body("cp").notEmpty().withMessage("Debes completar el campo de C.P."),
  body("province")
    .notEmpty()
    .withMessage("Debes completar el campo de provincia."),
  body("country").notEmpty().withMessage("Debes completar el campo de país."),
];
