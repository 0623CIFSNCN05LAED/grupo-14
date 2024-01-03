const { body } = require("express-validator");
const userDBservice = require("../services/userDBservice");

module.exports = [
  body("category").notEmpty().withMessage("Debe seleccionar una categoria"),
  body("name").custom((value, { req }) => {
    if (
      (req.body.category == "admin" || req.body.category == "cf") &&
      value == ""
    ) {
      throw new Error("Por favor, ingrese un Nombre.");
    } else if (
      (req.body.category == "admin" || req.body.category == "cf") &&
      value.length < 2
    ) {
      throw new Error(
        "El nombre debe tener al menos 2 caracteres. Intenta nuevamente."
      );
    }
    return true;
  }),
  body("lastName").custom((value, { req }) => {
    if (
      (req.body.category == "admin" || req.body.category == "cf") &&
      value == ""
    ) {
      throw new Error("Por favor, ingrese su Apellido.");
    } else if (
      (req.body.category == "admin" || req.body.category == "cf") &&
      value.length < 2
    ) {
      throw new Error(
        "El Apellido debe tener al menos 2 caracteres. Intenta nuevamente."
      );
    }
    return true;
  }),
  body("dni").custom((value, { req }) => {
    if (req.body.category == "cf" && value == "") {
      throw new Error("Por favor, ingrese su DNI.");
    } else if (req.body.category == "cf" && value.length !== 8) {
      throw new Error(
        "El DNI debe contener exactamente 8 números. Por favor, verifícalo e inténtalo nuevamente."
      );
    }
    return true;
  }),
  body("businessName").custom((value, { req }) => {
    if (req.body.category == "mayorista" && value == "") {
      throw new Error("Por favor, ingrese Razón Social.");
    } else if (req.body.category == "mayorista" && value.length < 2) {
      throw new Error(
        "Su Razon Social debe tener al menos 2 caracteres. Intenta nuevamente."
      );
    }
    return true;
  }),
  body("cuit").custom((value, { req }) => {
    if (req.body.category == "mayorista" && value == "") {
      throw new Error("Por favor, ingrese CUIT.");
    } else if (req.body.category == "mayorista" && value.length !== 11) {
      throw new Error(
        "El CUIT debe contener exactamente 11 números. Por favor, verifícalo e inténtalo nuevamente."
      );
    }
    return true;
  }),
  body("tel").notEmpty().withMessage("Por favor,ingrese Teléfono / Celular."),
  body("email")
    .notEmpty()
    .withMessage("Por favor, ingrese Correo Electrónico.")
    .bail()
    .isEmail()
    .withMessage(
      "Por favor, ingrese un Correo Electrónico válido. Ejemplo: nombre@dominio.com"
    )
    .custom((value, { req }) => {
      if (req.body.category === "admin" && !value.endsWith("@cleanwave.com")) {
        throw new Error(
          "Por favor, el correo ingresado debe coincidir con el dominio empresarial."
        );
      }
      return true;
    })
    .custom(async (value, { req }) => {
      if (await userDBservice.findByEmail(value)) {
        throw new Error(
          "El correo electrónico ya se encuentra registrado, por favor intente con otro."
        );
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Por favor, ingrese una contraseña")
    .bail()
    .isLength({ min: 8 })
    .withMessage(
      "La contraseña debe tener al menos 8 caracteres. Intenta nuevamente."
    )
    .matches(/[A-Z]/)
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula. Intenta nuevamente."
    )
    .bail()
    .matches(/[a-z]/)
    .withMessage(
      "La contraseña debe contener al menos una letra minúscula. Intenta nuevamente."
    )
    .bail()
    .matches(/[\d]/)
    .withMessage(
      "La contraseña debe contener al menos un número. Intenta nuevamente."
    ),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(
        "Las contraseñas no coinciden. Por favor, verifica que las contraseñas ingresadas sean iguales."
      );
    }
    return true;
  }),
  /* body("image").custom((value, { req }) => {
    let file = req.file;
    if (!file) {
      return true;
    }
    let acceptedExtensions = [".jpg", ".png", ".jpeg"];
    let fileExtension = path.extname(file.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error(
        `Debes subir un archivo tipo ${acceptedExtensions.join(", ")}`
      );
    }
    return true;
  }), */
];
