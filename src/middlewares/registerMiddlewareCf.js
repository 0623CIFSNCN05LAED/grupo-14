const { validationResult } = require("express-validator");
const userDBservice = require("../services/userDBservice")

module.exports = (req, res, next) => {
  let errores = validationResult(req);
  let userInDB = userDBservice.findByEmail(req.body.email)
  if (!errores.isEmpty()) {
    res.render("users/registerCf", {
      errors: errores.mapped(),
      oldData: req.body,
    });
  } else if (userInDB) {
    res.render("users/registerCf", {
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
