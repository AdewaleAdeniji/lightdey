require("dotenv").config();

exports.config = {
  development: process.env.devEnv || false,
  SMS_API_KEY: process.env.SMS_API_KEY,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  LIGHTDEY_NUMBER: process.env.LIGHTDEY_NUMBER,
  SENDCHAMP_BASE_URL: "https://api.sendchamp.com/api/v1/sms/send",
  WEATHER_BASE_URL:"https://api.weatherapi.com/v1/current.json"
};
