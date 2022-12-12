const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../clint_side/views"));
hbs.registerPartials(path.join(__dirname, "../clint_side/layouts"));
app.use(express.urlencoded({ extended: true }));

const bookRoute = require("./routes/book_routes");
app.use(bookRoute);

module.exports = app;
