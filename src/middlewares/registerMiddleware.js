const { validationResult } = require("express-validator");
const userDBservice = require("../services/userDBservice");

module.exports = async (req, res, next) => {
  let errores = validationResult(req);
  let userInDB = await userDBservice.findByEmail(req.body.email);
  if (!errores.isEmpty()) {
    res.render("users/register", {
      errors: errores.mapped(),
      oldData: req.body,
    });
  } else if (userInDB) {
    res.render("users/register", {
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
