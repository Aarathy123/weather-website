const request = require("request");

const forecast = ({ latitude, longitude }, callBack) => {
  const url = `http://api.weatherstack.com/current?access_key=5cb51e5c6bb453a4c59f0fdd11b4d69d&query=${latitude},${longitude}`;
  request(
    {
      url: url,
      json: true,
    },
    (error, { body } = {}) => {
      if (error) {
        callBack(error.info);
      } else if (body.error) {
        callBack(body.error.info);
      } else {
        const { weather_descriptions, temperature, feelslike } = body.current;
        callBack(
          undefined,
          `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`
        );
      }
    }
  );
};

module.exports = forecast;
