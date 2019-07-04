'use strict';

const express = require('express');
const axios = require('axios');
const config = require('../config');

const weatherRouter = express.Router();
const jsonBodyParser = express.json();


weatherRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const { postalCode } = req.body;
    const CITY_BASE_URL = `http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=${config.WEATHER_API_KEY}&q=${postalCode}`;

    axios(CITY_BASE_URL)
      .then(res => res.json())
      .then(res => {
        const locationKey = res[0].Key;
        const WEATHER_BASE_URL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=HGhQvGsArNhNHkbK4EAnuX09P8mP8Qk8&language=en-us&details=true`;

        return axios(WEATHER_BASE_URL)
          .then(res => res.json())
          .then(res => {
            console.log(res);
          });
      })
      .catch(next);
  });


module.exports = weatherRouter;