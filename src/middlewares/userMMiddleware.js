module.exports = (req, res, next) => {
  if (
    req.session.userLogged &&
    req.session.userLogged.category == "mayorista"
  ) {
    return res.redirect("/mayorista");
  }
  return next();
};
