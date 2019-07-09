'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const playlistRouter = require('./playlists/playlist-router');
const userRouter = require('./users/users-router');
const config = require('./config');
const axios = require('axios');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.post('/api/weather', async (req, res, next) => {
  const { postalCode } = req.body;
  const CITY_BASE_URL = `http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=${config.WEATHER_API_KEY}&q=${postalCode}`;
  try {
    let response = await axios.get(CITY_BASE_URL)
        let locationKey = response.data[0].Key;
        const WEATHER_BASE_URL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=HGhQvGsArNhNHkbK4EAnuX09P8mP8Qk8&language=en-us&details=true`;
        let finalRes = await axios.get(WEATHER_BASE_URL)
            console.log(finalRes.data[0]);
            res.send(finalRes.data[0]);
  } catch(e) {
    console.log(e);
  }
});

// app.post('/api/weather', async (req, res) => {
//   const { postalCode } = req.body;
//   const CITY_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${postalCode}&APPID=${config.NEW_API_KEY}`;
//   try {
//     let response = await axios.get(CITY_BASE_URL)
//       console.log(response.data.clouds.all * 100)
//       res.send(response.data)
//         // let finalRes = response.data;
//             // console.log(finalRes.clouds.all*100)
//             // res.send(finalRes);
//   } catch(e) {
//     console.log(e);
//   }
// });

app.use('/api/playlists', playlistRouter);
app.use('/api/users', userRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;