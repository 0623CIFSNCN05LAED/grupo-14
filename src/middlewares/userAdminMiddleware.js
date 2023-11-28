module.exports = (req, res, next) => {
  if (req.session.userLogged && req.session.userLogged.admin != null) {
    return next();
  }
  return res.redirect("/");
};
