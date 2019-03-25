const express = require('express');
require('dotenv').config();
const fireBase = require('./models/tasks.js');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get("/tasks/", (req, res) => {

  fireBase.getTask((err, task) => {
    res.send(
      JSON.stringify({
      task: err ? [] : task
    }));
  })

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
