const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const userController = {
  login: (req, res) => {
    res.render("users/login");
  },
  registerCf: (req, res) => {
    res.render("users/registerCf");
  },
  newUserCf: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.length > 0) {
      return res.render("users/registerCf", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    const user = {
      name: req.body.name,
      lastName: req.body.lastName,
      dni: req.body.dni,
      tel: req.body.tel,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      image: req.file ? req.file.filename : "userDefault.png",
      address: req.body.address,
      location: req.body.location,
      cp: req.body.cp,
      province: req.body.province,
      country: req.body.country,
      specification: req.body.specification,
      notify: req.body.notify,
      category: "consumidorFinal",
    };
    userService.createUser(user);
    res.redirect("users/login");
  },
  registerMayorista: (req, res) => {
    res.render("users/registerMayorista");
  },
  newUserM: (req, res) => {
    const user = {
      businessName: req.body.businessName,
      cuit: req.body.cuit,
      tel: req.body.tel,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      image: req.file ? req.file.filename : "userDefault.png",
      address: req.body.address,
      location: req.body.location,
      cp: req.body.cp,
      province: req.body.province,
      country: req.body.country,
      specification: req.body.specification,
      notify: req.body.notify,
      category: "mayorista",
    };
    userService.createUser(user);
    res.redirect("/mayorista");
  },
};

module.exports = userController;
