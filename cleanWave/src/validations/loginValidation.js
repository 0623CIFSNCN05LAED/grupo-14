const { body } = require("express-validator");
const userDBservice = require("../services/userDBservice");
const bcrypt = require("bcryptjs");

module.exports = [
  body("email")
    .notEmpty()
    .withMessage("Debes introducir una dirección de correo eléctronico")
    .bail()
    .isEmail()
    .withMessage("Debes introducir un formato de correo eléctronico válido")
    .bail()
    .custom(async (value, { req }) => {
      const userToLogin = await userDBservice.findByEmail(req.body.email);
      if (!userToLogin) {
        throw new Error(
          "Este email no se encuentra registrado en nuestra base de datos."
        );
      } else {
        return true;
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Debes introducir una contraseña")
    .bail()
    .custom(async (value, { req }) => {
      const userToLogin = await userDBservice.findByEmail(req.body.email);

      if (userToLogin) {
        const validPassword = await bcrypt.compare(
          req.body.password,
          userToLogin.password
        );
        if (!validPassword) {
          throw new Error("Las credenciales son invalidas");
        }
      }
      return true;
    }),
];
