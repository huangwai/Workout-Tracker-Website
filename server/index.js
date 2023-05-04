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

//define Route API's BELOW

//listening on port :)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
