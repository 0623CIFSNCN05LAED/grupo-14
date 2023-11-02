const db = require("../data/db");

module.exports = (req, res, next) => {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.email;
  let userFromCookie = db.users.findByField("email", emailInCookie);

  if (userFromCookie) {
    req.session.userLogged = userFromCookie;
  }

  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }

  next();
};
