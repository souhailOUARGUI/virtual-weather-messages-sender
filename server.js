const express = require("express");
// const cors = require("cors");
const env = require("dotenv").config();
const bodyParser = require("body-parser");
const { sendMetar, sendSynop } = require("./virtualSender");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(express.json());

// app.use(cors);
app.listen(port, () => {
  console.log(`VSender server started!, listening on port ${port}`);
  setInterval(() => {
    sendSynop();
  }, 1000 * 60 * 60);
  setInterval(() => {
    sendMetar();
  }, 1000 * 60 * 60);
});
