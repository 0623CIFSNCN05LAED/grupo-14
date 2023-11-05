module.exports = (req, res, next) => {
  if (req.session.userLogged && req.session.userLogged.category == "admin") {
    return next();
  }
  return res.redirect("/");
};
