//creating MySQL connection below
const mysql = require("mysql"); //enable mysql connection/usage
const dotenv = require("dotenv"); //hides all sensitive data
dotenv.config({ path: "./.env" });

const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD, //amazing password :)
  database: process.env.DATABASE,
  multipleStatements: true,
});

database.connect(function (err) {
  if (err) throw err;
  console.log("MySQL database is connected!");
});

module.exports = database;
