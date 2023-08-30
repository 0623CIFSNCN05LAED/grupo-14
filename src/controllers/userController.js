const express = require("express");

const userController = {
    login: (req,res)=>{
        res.render("register");
    },
    register: (req,res)=>{
        res.render("register");
    }
};

module.exports = userController;
