const express = require("express");

const userController = {
  login: (req, res) => {
    res.render("users/login");
  },
  registerCf: (req, res) => {
    res.render("users/registerCf");
  },
  registerMayorista: (req, res) => {
    res.render("users/registerMayorista");
  },
};

module.exports = userController;
