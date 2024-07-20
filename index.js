const express = require("express");

require("dotenv").config();

const db = require("./db/db");
const cors = require("cors");
const userRoutes = require("./routes/User");

const urlRoutes = require("./routes/Urls");

const clicksRouter = require("./routes/Clicks");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.static("./public"));

app.use("/user", userRoutes);

app.use("/url", urlRoutes);

app.use("/clicks", clicksRouter);

app.listen(3000, () => {
  console.log("SERVER RUNNING IN ", 3000);
});
