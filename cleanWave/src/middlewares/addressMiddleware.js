const { validationResult } = require("express-validator");
const userService = require("../services/userDBservice");

module.exports = (req, res, next) => {
  let errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.render("users/address", {
      errors: errores.mapped(),
      oldData: req.body,
    });
  } else {
    next();
  }
};
