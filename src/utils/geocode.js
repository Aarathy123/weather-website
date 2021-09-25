const request = require("request");

const geoCode = (address, callback) => {
  const urlGeoLocation = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWFyYXRoeW0iLCJhIjoiY2t0dWh4ZHNyMjAzMTJ5cG43cm90ZWFqcSJ9.OF0iogZu3XbTdSzswahlGA&limit=1`;

  request({ url: urlGeoLocation, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (!body.features || body.features.length === 0) {
      callback("No matching results found");
    } else {
      const [longitude, latitude] = body.features[0].center;
      callback(undefined, {
        latitude,
        longitude,
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
