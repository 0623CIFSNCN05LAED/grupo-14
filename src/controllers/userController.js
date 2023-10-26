const express = require("express");

// const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const userController = {
  login: (req, res) => {
    res.render("users/login");
  },
  loginProcess: (req, res) => {
    const userToLogin = userService.userInDb(req.body.email);
    console.log(userToLogin);
    if (userToLogin) {
      return res.send(userToLogin);
    }
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
