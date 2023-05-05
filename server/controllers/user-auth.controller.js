const express = require("express");
const Router = express.Router();
const database = require("../database");
var saltRounds = 10; //hash password
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const session = require("express-session"); //helps keep user login
const cookieParser = require("cookie-parser");
Router.use(cookieParser());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(express.json());
//intialize session

// Router.use(
//   session({
//     key: "userId",
//     secret: "sussy",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24 * 1000, //24 hours
//     },
//   })
// );
//create controllers below

//test controller
const getAllusers = (req, res) => {
  const query = `SELECT * FROM users`;
  console.log("WHY IS THIS NOT WORKING");
  database.query(query, (err, data) => {
    console.log("got all users");
    if (err) {
      console.log("error found");
      res.send(err);
    } else {
      console.log("got all users");
      res.send(data);
    }
  });
};

//register user into database if their account doesn't exist
const registerUser = (req, res) => {
  console.log("inside register");
  const { username, password, firstName, lastName, email } = req.body;

  //checking that all fields are filled out
  if (!username || !password || !firstName || !email) {
    return res.send({ message: "All fields are required" });
  }

  const query =
    "INSERT INTO users(username,password,firstName,lastName,email) VALUES (?,?,?,?,?)";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    database.query(
      query,
      [username, hash, firstName, lastName, email],
      (err, data) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          if (data.affectedRows === 1) {
            // console.log(data);
            // const userID = data.insertId;
            // const token = jwt.sign({ userID }, "secret");
            // res.send({ userID, token });
            res.send(data);
            console.log("Registered User into DB.");
          } else {
            res.send({ message: "Unable to register User. Please try again." });
          }
        }
      }
    );
  });
}; //end of register function

// Logs user into database if username exist and password is correct
const loginUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("hit");
  //Checks that user is filling out username and password fields
  if (!username || !password) {
    return res.send({ message: "Username and Password are required" });
  }
  const query = `SELECT * FROM users WHERE username = '${req.body.username}'`;
  database.query(query, (err, data) => {
    if (err) {
      res.send(err);
    } else if (data && data.length > 0) {
      const user = data[0];
      console.log("user: ", user);
      // const id = data[0].id;
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (response) {
          // const token = jwt.sign({ id }, "jwtSecretKey", {
          //   expiresIn: 60 * 60 * 24,
          // }); //expires in 24 hours
          console.log("req session: ", req.session);
          req.session.user = data;
          res.send(data);
          console.log(data);
        } else {
          //if not valid password
          console.log("password sus");
          res.send({ message: "Invalid username or password" });
        }
      });
    } else {
      res.send({ message: "User doesn't not exist" });
    }
  });
}; //end of login function

//keep user logged in
const keepLogin = (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

//logs user out of website
const logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      //if logout not gud
      if (err) {
        console.log("Logout Incomplete");
        res.send(err);
      } else {
        //no errors
        console.log("Logout Successful");
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
};
//export functions below

module.exports = {
  loginUser,
  registerUser,
  getAllusers,
  keepLogin,
  logoutUser,
};
