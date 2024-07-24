const express = require("express");
const Auth = require("../middleware/Auth");
const {
  storeClicks,
  getClicksForUrls,
  getUrlClicks,
} = require("../controllers/clicks.controllers");

const app = express();

app.post("/storeClicks", storeClicks);

app.get("/getAllClicks", Auth, getClicksForUrls);

app.get("/getUrlClicks/:url_id", Auth, getUrlClicks);

module.exports = app;
