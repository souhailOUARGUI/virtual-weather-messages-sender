// const { timeStamp } = require("console");

const API_key = "https://moga-weather-api.onrender.com";

const generateRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const sendMetar = async () => {
  try {
    const request = await fetch(
      "https://www.meteosource.com/api/v1/free/point?place_id=essaouira&sections=all&timezone=UTC&language=en&units=metric&key=0ocvcezpqal4ork7427zgpd15qf5p3aysmh49ff5",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((resp) => resp.json())
      .then(async (data) => {
        // console.log(data.current.temperature);
        // console.log(data.current.wind.speed);
        // console.log(data.current.wind.angle);
        // console.log(generateMetar(data.current.temperature));
        try {
          const response = await fetch(`${API_key}/messages/metars`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
              generateMetar(
                data.current.temperature,
                data.current.wind.speed,
                data.current.wind.angle
              )
            ),
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log("post msg sent");
              console.log(data);
            })
            .catch((err) => {
              console.error("error sending data", err);
            });
        } catch (error) {
          console.error("Error:", error);
        }
        // return data.current.temperature;
      })
      .catch((err) =>
        console.error("error getting data from weather api", err)
      );
  } catch (error) {
    console.error(error);
  }
};

const sendSynop = async () => {
  try {
    await fetch(`${API_key}/messages/synops`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(generateSynop()),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("post msg sent");
        console.log(data);
      })
      .catch((err) => {
        console.error("error sending data", err);
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

const generateMetar = (temp, wind_speed, wind_angle) => {
  const type = "METAR";
  const station = "GMMI";
  const timestamp = new Date().toISOString();
  // const windDirections = [0, 90, 180, 270, 360];
  // const windSpeeds = [5, 10, 15, 20, 25];
  const wind_unit = "KT";
  const visibilities = [
    "9999",
    "8000",
    "6000",
    "5000",
    "3000",
    "2000",
    "1000",
    "0500",
  ]; // meters
  const visibility =
    visibilities[Math.floor(Math.random() * visibilities.length)];
  const weathers = ["NSC", "RA", "FG", "BR", "HZ"];
  const weather = weathers[Math.floor(Math.random() * weathers.length)];

  const remarksList = ["NOSIG", "TEMPO", "BECMG"];
  const remarks = remarksList[Math.floor(Math.random() * remarksList.length)];
  const dew_point = generateRandomInt(10, 25);
  const pressures = [1010, 1012, 1015, 1020];
  const pressure = pressures[Math.floor(Math.random() * pressures.length)];

  const timestampString = `${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}Z`;

  return {
    message: `METAR GMMI ${timestampString} ${wind_angle}${wind_speed}KT ${visibility} ${weather} ${temp}/${dew_point} ${pressure} ${remarks}=`,
    type: type,
    station: station,
    timestamp: timestamp,
    // wind_direction:
    //   windDirections[Math.floor(Math.random() * windDirections.length)],
    wind_direction: wind_angle,
    // wind_speed: windSpeeds[Math.floor(Math.random() * windSpeeds.length)],
    wind_speed: wind_speed,
    wind_unit: wind_unit,
    visibility: visibility,
    weather: weather,
    // temperature: generateRandomInt(10, 48),
    temperature: temp,
    dew_point: dew_point,
    pressure: pressure,
    remarks: remarks,
  };
};

const generateSynop = () => {
  const msg = {
    message: "SYNOP 34567 171600 18010 9999 FEW020 20/18 Q1005 RMK=",
    // timeStamp: ,
    type: "SYNOP",
    station: "GMMX",
    wind_direction: 180,
    wind_speed: 10,
    wind_gust: 18,
    visibility: "9999",
    weather: "FEW020",
    cloud_coverage: "BKN040",
    temperature: 30,
    dew_point: 18,
    pressure: 1005,
    remarks: "Haze in the vicinity",
  };

  return msg;
};

module.exports = { sendMetar, sendSynop };
