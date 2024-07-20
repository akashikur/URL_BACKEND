const express = require("express");
const {
  sighupUser,
  loginUser,
  getUser,
} = require("../controllers/user.controllers");
const upload = require("../middleware/upload");
const { uploadHandler } = require("../middleware/upload");
const Auth = require("../middleware/Auth");

const app = express();

app.post("/sighUp", uploadHandler, sighupUser);

app.post("/login", loginUser);

app.get("/userData", Auth, getUser);

module.exports = app;
