const express = require("express");

const userService = require("../services/userService");

const userController = {
  login: (req, res) => {
    res.render("users/login");
  },
  registerCf: (req, res) => {
    res.render("users/registerCf");
  },
  newUser: (req, res) => {
    const user = {
      name: req.body.name,
      lastName: req.body.lastname,
      dni: req.body.dni,
      tel: req.body.tel,
      email: req.body.email,
      password: req.body.password,
      image: req.file ? req.file.filename : "userDefault.png",
      address: req.body.address,
      location: req.body.location,
      cp: req.body.cp,
      province: req.body.province,
      country: req.body.country,
      specification: req.body.specification,
      notify: req.body.notify,
      category: "consumidor final",
    };
    userService.createUser(user);
    res.redirect("/cf");
  },
  registerMayorista: (req, res) => {
    res.render("users/registerMayorista");
  },
};

module.exports = userController;
