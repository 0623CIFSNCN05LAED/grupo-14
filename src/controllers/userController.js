const express = require("express");

const userController = {
    login: (req,res)=>{
        res.render("users/register");
    },
    register: (req,res)=>{
        res.render("users/register");
    }
};

module.exports = userController;
