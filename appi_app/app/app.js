const express = require("express");
const app = express();
const path = require("path");

require("../db/connect");

app.use(express.json());
app.use(express.static(path.join(__dirname,"../uploads")))

const userRoutes = require("../routes/user_routes");
const postRoutes = require("../routes/post_routes");
app.use("/api/user/", userRoutes);
app.use("/api/post/", postRoutes);
app.all("*", (req, res) => {
  res.status(404).send({
    apisStatus: false,
    message: "Invalid URL",
    data: {},
  });
});
module.exports = app;
