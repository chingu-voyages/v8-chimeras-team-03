const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {

  res.send("Backend Server works");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
