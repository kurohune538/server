"use strict";

const path = require("path");

const express = require("express");
const st = require("st");
// const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const client = require("./util/db");

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

app.post("/yokome_admin/add", (req, res) => {
  client.connect();
  client.query(
    'SELECT id FROM users WHERE pass=$1',
    [req.body.password],
    (err2, result) => {
      if (err2) {
        return console.error('error running query', err2);
      }
      console.log(result);
      // if(result.rows.length > 1){
      client.query(
        'INSERT INTO posts(title, description, like_count) VALUES($1, $2, $3)',
        [req.body.title, req.body.comment, 0],
        (err3, result3) => {
          if (err3) {
            return console.error('error running query', err3);
          }
          console.log(result3);
          client.end();
          res.send("OK");
        });
      // } else {
      //   return console.error('パスワードが違います', err);
      // }
    });
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
