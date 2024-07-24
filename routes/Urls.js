const express = require("express");
const Auth = require("../middleware/Auth");
const { handleQrUpload } = require("../middleware/upload");
const {
  createUrl,
  getAllUserUrls,
  getUrl,
  getLongUrl,
  deleteUrl,
} = require("../controllers/url.contollers");

const app = express();

app.post("/createUrl", Auth, handleQrUpload, createUrl);

app.get("/allUrl", Auth, getAllUserUrls);

app.get("/getUrl/:id", Auth, getUrl);

app.get("/longUrl/:url_id", getLongUrl);

app.delete("/deleteUrl/:url_id", Auth, deleteUrl);

module.exports = app;
