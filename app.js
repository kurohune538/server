"use strict";

const path = require("path");

const express = require("express");
const st = require("st");
// const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));
// app.use(favicon(path.join(__dirname, "static", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/yokome_admin", (req, res) => {
  res.render("post");
});

app.use(st({
  path: path.join(__dirname, "static"),
  url: "/",
  index: "index.html",
  passthrough: true
}));

app.use((req, res) => {
  res.status(404);
  res.render("404", {});
});

app.use((err, req, res) => {
  res.status(500);
  res.render("500", {
    message: err.message,
    error: app.get("dev") ? err : {}
  });
});

module.exports = app;
