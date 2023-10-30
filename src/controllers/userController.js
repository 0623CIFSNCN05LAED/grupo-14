const express = require("express");

// const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const userController = {
  login: (req, res) => {
    res.render("users/login");
  },
  loginProcess: (req, res) => {
    const userToLogin = userService.userInDb(req.body.email);
    if (userToLogin) {
      const isOkThePassword = userService.correctPassword(
        req.body.password,
        userToLogin.password
      );
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        return res.redirect("/users/profile");
      }
      return res.render("users/login", {
        errors: {
          password: {
            msg: "Las credenciales son invalidas",
          },
        },
      });
    }
    return res.render("users/login", {
      errors: {
        email: {
          msg: "No se encuentra este email en nuestra base de datos",
        },
      },
    });
  },
  profile: (req, res) => {
    res.render("users/userProfile", {
      user: req.session.userLogged,
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },
  registerCf: (req, res) => {
    res.render("users/registerCf");
  },
  newUserCf: (req, res) => {
    const dataUser = req;
    userService.createUserCf(dataUser);
    res.redirect("users/login"); /* aca deberia ser login ?? */
  },
  registerMayorista: (req, res) => {
    res.render("users/registerMayorista");
  },
  newUserM: (req, res) => {
    const dataUser = req;
    userService.createUserM(dataUser);
    res.redirect("login"); /* por que no usamos la misma que en linea 16 */
  },
};

module.exports = userController;
