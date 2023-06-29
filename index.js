const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { CreateLocation, CheckLightUpdate, HandleLightsDey, HandleLightCheck, getLight } = require("./controllers/Light");
require("dotenv").config();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/health", (_, res) => {
  res.send("ok");
});
app.post("/locations/create", CreateLocation);
app.get("/locations/light/:lightID", CheckLightUpdate);

app.post("/locations/light/:lightID", HandleLightsDey);
app.put("/locations/light/:lightID", HandleLightCheck);
app.get("/light/:lightID", getLight);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/CRUD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB, // specify the database name here
  })
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("error occured connecting to mongodb"));

app.listen(process.env.PORT || 3003, () => {
  console.log("Server is running on port 3003");
});
