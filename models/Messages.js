const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const smsSchema = new Schema({
  smsID: {
    type: String,
    default: "",
  },
  number: String,
  content: String,
  rawResponse: String,
  reference: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
exports.smses = smsSchema;
module.exports = mongoose.model("smses", smsSchema);
