const userDBservice = require("../services/userDBservice");

module.exports = {
  viewLogin: (req, res) => {
    res.render("users/login");
  },
  login: async (req, res) => {
    const dataUser = await userDBservice.findByEmail(req.body.email);
    delete dataUser.password;
    req.session.userLogged = dataUser;
    if (req.body.rememberUser) {
      res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 2 });
    }
    if (dataUser.mayorista != null) {
      res.cookie("userType", "mayorista", { maxAge: 1000 * 60 * 2 });
    } else if (dataUser.cf != null) {
      res.cookie("userType", "consumidorfinal", { maxAge: 1000 * 60 * 2 });
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
    const file = req.file;
    userDBservice.create(dataUser, file);
    res.redirect("/");
  },
  viewFormAddress: (req, res) => {
    res.render("users/address");
  },
  registerAddress: (req, res) => {
    const dataAddress = req.body;
    userDBservice.createAddress(dataAddress);
    res.redirect("/");
  },
  delete: (req, res) => {
    const id = req.params.id;
    userDBservice.delete(id);
    res.redirect("/");
  },

  profile: (req, res) => {
    const userType = req.cookies.userType || "defaultUserType";

    res.render("users/userProfile", {
      userType,
      user: req.session.userLogged,
    });
  },
};
