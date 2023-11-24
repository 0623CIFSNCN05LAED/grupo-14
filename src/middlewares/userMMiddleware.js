module.exports = (req, res, next) => {
  if (req.session.userLogged && req.session.userLogged.mayorista !== null) {
    return res.redirect("/mayorista");
  }
  return next();
};
