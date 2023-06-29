const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lightSchema = new Schema(
  {
    status: String,
    temperature: String,
    lightID: String,
    lastSmsID: String,
    onSince: String,
    lastDelivered: String,
    smsDelivered: {
      type: Boolean,
      default: false,
    },
    lastChecked: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "1",
    },
  },
  {
    timestamps: true,
  }
);
exports.light = lightSchema;
module.exports = mongoose.model("lightStatus", lightSchema);
