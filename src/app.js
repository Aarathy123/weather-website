const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aarathy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather App",
    name: "Aarathy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    example: "This is an example message",
    title: "Help",
    name: "Aarathy",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Provide Address",
    });
    return;
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({
          error,
        });
        return;
      }
      forecast({ latitude, longitude }, (error, forecastData) => {
        if (error) {
          res.send({
            error,
          });
          return;
        }
        console.log(location);
        console.log(forecastData);
        res.send({
          location,
          address: req.query.address,
          forecast: forecastData,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provide search" });
    return;
  }
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aarathy",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aarathy",
    errorMessage: "Page not found",
  });
});
app.listen(3000, () => {
  console.log("Server is up and running");
});
