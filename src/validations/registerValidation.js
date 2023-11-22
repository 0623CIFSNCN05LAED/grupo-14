const { body } = require("express-validator");

module.exports = [
  body("category").notEmpty().withMessage("Debe seleccionar una categoria"),
  body("name").custom((value, { req }) => {
    if (
      (req.body.category == "admin" || req.body.category == "cf") &&
      value == ""
    ) {
      throw new Error("Debes completar el campo de nombre.");
    } else if (
      (req.body.category == "admin" || req.body.category == "cf") &&
      value.length < 2
    ) {
      throw new Error("Debe tener mas de dos caracteres.");
    }
    return true;
  }),
  body("lastName").custom((value, { req }) => {
    if (
      (req.body.category == "admin" || req.body.category == "cf") &&
      value == ""
    ) {
      throw new Error("Debes completar el campo de apellido.");
    }
    return true;
  }),
  body("dni").custom((value, { req }) => {
    if (req.body.category == "cf" && value == "") {
      throw new Error("Debes completar el campo de DNI.");
    } else if (req.body.category == "cf" && value.length !== 8) {
      throw new Error("El DNI debe tener 8 caracteres.");
    }
    return true;
  }),
  body("businessName").custom((value, { req }) => {
    if (req.body.category == "mayorista" && value == "") {
      throw new Error("Debes completar el campo de Razón social.");
    } else if (req.body.category == "mayorista" && value.length < 2) {
      throw new Error("Debe tener mas de dos caracteres.");
    }
    return true;
  }),
  body("cuit").custom((value, { req }) => {
    if (req.body.category == "mayorista" && value == "") {
      throw new Error("Debes completar el campo de CUIT.");
    } else if (req.body.category == "mayorista" && value.length !== 11) {
      throw new Error("El DNI debe tener 11 caracteres.");
    }
    return true;
  }),
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
  /* body("image").custom((value, { req }) => {
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
  }), */
];
