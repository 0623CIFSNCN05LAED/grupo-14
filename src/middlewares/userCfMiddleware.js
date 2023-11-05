module.exports = (req, res, next) => {
  if (
    req.session.userLogged &&
    req.session.userLogged.category == "consumidorFinal"
  ) {
    return res.redirect("/cf");
  }
  return next();
};
