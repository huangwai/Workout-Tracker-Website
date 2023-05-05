const express = require("express");
const app = express();
const cors = require("cors"); //parsing json objects
const dotenv = require("dotenv"); //hides all sensitive data
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3002;

dotenv.config({ path: "./.env" });

app.use(express.json()); //allows us to send any json from client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//allowing user to stay logged in
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true, //allowing cookie to be enabled
  })
);

//define Route API's BELOW

//API's for User Authenication
const UserAuthRoutes = require("./routes/user_auth.routes.js");
app.use("/user-auth", UserAuthRoutes);

//listening on port :)
app.listen(PORT, () => {
  // console.log("hi");
  console.log(`Server is running on port ${PORT}.`);
});
