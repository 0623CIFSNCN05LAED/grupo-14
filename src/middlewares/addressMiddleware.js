const { validationResult } = require("express-validator");
const userService = require("../services/userDBservice")

module.exports = (req, res, next) => {
  let errores = validationResult(req);
  let userInDB = userService.findByEmail(emailInCookie);
  if (!errores.isEmpty()) {
    res.render("users/registerMayorista", {
      errors: errores.mapped(),
      oldData: req.body,
    });
  } else if (userInDB) {
    res.render("users/registerMayorista", {
      errors: {
        email: {
          msg: "Este correo electrónico ya está registrado.",
        },
      },
      oldData: req.body,
    });
  } else {
    next();
  }
};
