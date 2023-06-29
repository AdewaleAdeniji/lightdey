const axios = require("axios");
const configs = require("../constants/config");
const { mockSmsResponse } = require("../constants/apiMocks");

var data = JSON.stringify({
  to: configs.config.LIGHTDEY_NUMBER,
  message: "test",
  sender_name: "Sendchamp",
  route: "dnd",
});

var config = {
  method: 'post',
  url: configs.config.SENDCHAMP_BASE_URL,
  headers: {
    Authorization: `Bearer ${configs.config.SMS_API_KEY}`,
    "Content-Type": "application/json",
  },
  data: data,
};

exports.sendSMS = async () => {
  if (configs.config.development) return mockSmsResponse;
  try {
    //console.log(config.data);
    const res = await axios(config); //axios.post(config.url, config.data, config.headers);
    return {
      ...res,
      sent: true,
    };
  } catch (err) {
    // console.log(err.request);
    console.log(err.response.data)
    return {
      sent: false,
    };
  }
};
