const axios = require("axios");
const configs = require("../constants/config");
const { mockWeatherResponse } = require("../constants/apiMocks");

var config = {
  url: `https://api.weatherapi.com/v1/current.json?q=ogbomoso&key=${configs.config.WEATHER_API_KEY}`,
};

async function getWeatherReport() {
 if configs.config.development return mockWeatherResponse;
  try {
    const res = await axios.get(config.url);
    return {
      ...res,
      retrieved: true,
    };
  } catch {
    return {
        retrieved: false,
    };
  }
}
