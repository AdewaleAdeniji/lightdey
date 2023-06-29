const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lightTimesSchema = new Schema({
  timelineID: {
    type: String,
    default: "",
  },
  day: String,
  status: String,
  temperature: String,
  lightID: String,
},
{
  timestamps: true,
});
exports.sands = lightTimesSchema;
module.exports = mongoose.model("lightTimes", lightTimesSchema);
