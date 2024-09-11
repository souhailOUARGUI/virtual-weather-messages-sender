const express = require("express");
const env = require("dotenv").config();
const bodyParser = require("body-parser");
const { sendMetar, sendSynop } = require("./virtualSender");

const render_url = `https://moga-weather-api.onrender.com`; //Render URL
const render_interval = 30000; // Interval in milliseconds (60 seconds)

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(express.json());

// app.use(cors);
app.listen(port, () => {
  console.log(`VSender server started!, listening on port ${port}`);
  // setInterval(() => {
  //   sendSynop();
  // }, 1000 * 60 * 60);
  setInterval(() => {
    sendMetar();
    // sendSynop();
  }, 4000);
  setInterval(reloadWebsite, render_interval);
});

//Reloader Function
function reloadWebsite() {
  axios
    .get(render_url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}
