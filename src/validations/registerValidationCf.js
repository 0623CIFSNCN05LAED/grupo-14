const { body } = require("express-validator");

module.exports = [
  body("name").notEmpty().withMessage("Debes completar el campo de nombre."),
  body("lastName")
    .notEmpty()
    .withMessage("Debes completar el campo de apellido."),
  body("dni").notEmpty().withMessage("Debes completar el campo de DNI."),
  body("tel")
    .notEmpty()
    .withMessage("Debes completar el campo de Teléfono / Celular."),
  body("email")
    .notEmpty()
    .withMessage("Debes introducir una dirección de correo eléctronico.")
    .bail()
    .isEmail()
    .withMessage("Debes introducir un formato de correo eléctronico válido."),
  body("password")
    .notEmpty()
    .withMessage("Debes escribir una contraseña.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener como mínimo 8 caracteres."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden.");
    }
    return true;
  }),
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
