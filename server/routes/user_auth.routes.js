const express = require("express");
const Router = express.Router();
// const database = require("../database");
const session = require("express-session"); //helps keep user login

Router.use(express.json());
Router.use(
  session({
    key: "userId",
    secret: "sussy",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000, //24 hours
    },
  })
);
const User_Auth = require("../controllers/user-auth.controller");
//Define Controller object to use below

Router.post("/register", User_Auth.registerUser);
// Router.get("/get", User_Auth.getAllusers);
Router.post("/login", User_Auth.loginUser);
Router.get("/login", User_Auth.keepLogin);

//create routes below
module.exports = Router;
