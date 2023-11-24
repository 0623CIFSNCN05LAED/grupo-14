const userDBservice = require("../services/userDBservice");

module.exports = {
  viewLogin: (req, res) => {
    res.render("users/login");
  },
  login: async (req, res) => {
    const dataUser = await userDBservice.findByEmail(req.body.email);
    delete dataUser.password;
    req.session.userLogged = dataUser;
    console.log("user", req.session.userLogged.admin.name);
    if (req.body.rememberUser) {
      res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 2 });
    }
    return res.redirect("/users/profile");
  },
  profile: (req, res) => {
    res.render("users/userProfile", {
      user: req.session.userLogged,
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("email");
    return res.redirect("/");
  },
  viewRegister: (req, res) => {
    res.render("users/register");
  },
  register: (req, res) => {
    const dataUser = req.body;
    userDBservice.create(dataUser);
    res.redirect("/");
  },
  delete: (req, res) => {
    const id = req.params.id;
    userDBservice.delete(id);
    res.redirect("/");
  },
};
