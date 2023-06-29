const LightModel = require("../models/Light");
const LightTimelineModel = require("../models/LightTimes");
const MessageModel = require("../models/Messages");
const Utils = require("../utils");
const ST = require("../constants/statuses");
const SMS = require("../services/MessageService");

exports.CheckLightUpdate = async (req, res) => {
  // get light
  const lightID = req.params.lightID;
  try {
    const light = await LightModel.findOne({
      lightID,
    });
    if (!light)
      return res.status(400).send({
        message: "Area not found",
      });
    const smsId = light.lastSmsID;
    const isDelivered = light.smsDelivered;
    const lastChecked = light.lastChecked;

    if (lastChecked === "") {
      //never checked
      return handleSendCheckSMS(res, light);
    }
    // check if isDelivered

    if (!isDelivered) {
      //update light to off
      const updateLight = {
        status: ST.STATUSES.OFF,
        lastChecked: Date.now(),
      };
      LightModel.findByIdAndUpdate(light._id, updateLight);
      //create timeline
      LightTimelineModel.create({
        lightID,
        status: ST.STATUSES.OFF,
      });
      console.log(light);
      return res.status(400).send({
        message: "OFF",
      });
    }

    return handleSendCheckSMS(res, light);
  } catch (err) {
    console.log(err);
  }
  // check if smsID is present
  //check if deliveryReport is positive
  // if positive resend
  // if not, update status: OFF
  // save timeline
};
const handleSendCheckSMS = async (res, light) => {
  //send sms
  //update the location object
  const smsSend = await SMS.sendSMS();
  console.log(smsSend);
  if (!smsSend.sent) {
    return res.status(400).send({
      message: "Failed to send sms",
    });
  }
  // save the reference
  // save the smsID
  const updateLight = {
    lastChecked: Date.now(),
    smsDelivered: true,
    lastSmsID: smsSend.data.reference,
  };
  LightModel.findByIdAndUpdate(light._id, updateLight);
  //create timeline
  LightTimelineModel.create({
    lightID: light.lightID,
    status: light.status,
  });
  //console.log(light)
  return res.status(400).send(light);
};
exports.HandleLightsDey = async (req, res) => {
  //sent from my phone
  //update last delivered, and status to ON
  // set timeline to ON
  const lightID = req.params.lightID;
  console.log(lightID)
  try {
    const light = await LightModel.findOne({
      lightID,
    });
    console.log(light._id.toString())
    if (!light)
      return res.status(400).send({
        message: "Area not found",
      });

    const updateLight = {
      status: ST.STATUSES.ON,
      lastDelivered: Date.now(),
    };
    if (light.status === ST.STATUSES.OFF) {
      updateLight.onSince = Date.now();
    }
    await LightModel.findByIdAndUpdate(light._id.toString(), updateLight);
    //create timeline
    await LightTimelineModel.create({
      timelineID: Utils.generateID(),
      lightID,
      status: ST.STATUSES.ON,
    });
    return res.status(200).send(updateLight);
  } catch (err) {
    console.log(err.message);
    res.send(500);
  }
};
exports.getLight = async (req, res) => {
  const lightID = req.params.lightID;
  try {
    const light = await LightModel.findOne({
      lightID,
    });
    if (!light)
      return res.status(400).send({
        message: "Area not found",
      });
      // check if lastDelivered is more than 30 minutes
      const lastDelivered = light.lastDelivered;
      const isMore = Utils.isMoreThan30MinutesAgo(lastDelivered);
      var status = light.status;
      console.log(isMore);

      if(isMore.isMoreThan30MinutesAgo && light.status === ST.STATUSES.ON){
        const updateLight = {
          status: ST.STATUSES.OFF,
          onSince: Date.now(),
        };
        status = ST.STATUSES.OFF;
        await LightModel.findByIdAndUpdate(light._id.toString(), updateLight);
        //create timeline
        await LightTimelineModel.create({
          timelineID: Utils.generateID(),
          lightID,
          status: ST.STATUSES.OFF,
        });
        
      }
    // if (light.status === ST.STATUSES.OFF) {
    //   updateLight.onSince = Date.now();
    // }
    const ulight = await LightModel.findOne({
      lightID,
    });
    return res.status(200).send(ulight);
  } catch (err) {
    console.log(err.message);
    res.send(500);
  }
};
exports.HandleLightCheck = async (req, res) => {
  //sent from my phone
  //update last delivered, and status to ON
  // set timeline to ON
  const lightID = req.params.lightID;
  try {
    const light = await LightModel.findOne({
      lightID,
    });
    if (!light)
      return res.status(400).send({
        message: "Area not found",
      });
      // check if lastDelivered is more than 30 minutes
      const lastDelivered = light.lastDelivered;
      const isMore = Utils.isMoreThan30MinutesAgo(lastDelivered);
      var status = light.status;
      if(isMore.isMoreThan30MinutesAgo && light.status === ST.STATUSES.ON){
        const updateLight = {
          status: ST.STATUSES.OFF,
          onSince: Date.now(),
        };
        status = ST.STATUSES.OFF;
        await LightModel.findByIdAndUpdate(light._id.toString(), updateLight);
        //create timeline
        await LightTimelineModel.create({
          timelineID: Utils.generateID(),
          lightID,
          status: ST.STATUSES.OFF,
        });
        
      }
    // if (light.status === ST.STATUSES.OFF) {
    //   updateLight.onSince = Date.now();
    // }
    return res.status(200).send(status);
  } catch (err) {
    console.log(err.message);
    res.send(500);
  }
};
exports.CreateLocation = async (req, res) => {
  req.body.lightID = Utils.generateID();
  const lightPlace = await LightModel.create(req.body);
  return res.status(200).send(lightPlace);
};
