const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("../db/connect");

const userRoutes = require("../routes/user_routes");
const roleRoutes = require("../routes/role_routes");
const urlRoutes = require("../routes/url_routes");
const buildingRoutes = require("../routes/building_routes");
const projectRoutes = require("../routes/project_routes");
const UnitRoutes = require("../routes/unit_routes");
const BookingRoutes = require("../routes/booking_routes");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/user/", userRoutes);
app.use("/api/role/", roleRoutes);
app.use("/api/url/", urlRoutes);
app.use("/api/building/", buildingRoutes);
app.use("/api/project/", projectRoutes);
app.use("/api/unit/", UnitRoutes);
app.use("/api/booking/", BookingRoutes);

app.all("*", (req, res) => {
  res.status(404).send({
    apisStatus: false,
    message: "Invalid URL",
    data: {},
  });
});
module.exports = app;
