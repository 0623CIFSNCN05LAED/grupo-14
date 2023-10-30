const { body } = require("express-validator");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Debes introducir una dirección de correo eléctronico")
    .bail()
    .isEmail()
    .withMessage("Debes introducir un formato de correo eléctronico válido"),
  body("password").notEmpty().withMessage("Debes introducir una contraseña"),
];
