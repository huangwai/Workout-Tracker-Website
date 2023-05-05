const mysql = require("mysql"); //require mysql

const con = mysql.createConnection({
  host: "localhost",
  user: "login",
  password: "Likeaboss1!",
});

con.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL.");
});
