'use strict';

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  NEW_API_KEY: process.env.NEW_API_KEY,
  DB_URL: process.env.DB_URL || 'postgresql://spotify@localhost/wind-chime',
};