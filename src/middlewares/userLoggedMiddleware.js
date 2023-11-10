const userService = require("../services/userDBservice")

module.exports = (req, res, next) => {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.email;
  let userFromCookie = userService.findByEmail(emailInCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
};
