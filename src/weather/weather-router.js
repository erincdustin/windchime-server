// 'use strict';

// const express = require('express');
// const axios = require('axios');
// const config = require('../config');

// const weatherRouter = express.Router();
// const jsonBodyParser = express.json();


// weatherRouter
//   .route('/')
//   .post(jsonBodyParser, '/api/weather', async (req, res) => {
//     const { postalCode } = req.body;
//     const CITY_BASE_URL = `http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=${config.WEATHER_API_KEY}&q=${postalCode}`;
//     try {
//       let response = await axios.get(CITY_BASE_URL)
//           let locationKey = response.data[0].Key;
//           const WEATHER_BASE_URL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=HGhQvGsArNhNHkbK4EAnuX09P8mP8Qk8&language=en-us&details=true`;
//           let finalRes = await axios.get(WEATHER_BASE_URL)
//               console.log(finalRes.data[0]);
//               res.send(finalRes.data[0]);
//     } catch(e) {
//       console.log(e);
//     }
//   });


// module.exports = weatherRouter;