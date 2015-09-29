"use strict";

const path = require("path");

const express = require("express");
const st = require("st");
// const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

var pg = require('pg');
var connectionString = require(path.join(__dirname, 'config.json')).database_url;
var username = require(path.join(__dirname, 'config.json')).db_user_name;
var password = require(path.join(__dirname, 'config.json')).db_pass;
var host = require(path.join(__dirname, 'config.json')).host;
var database_name = require(path.join(__dirname, 'config.json')).database_name;
var client = new pg.Client({
  user: username,
  password: password,
  host: host,
  port: 5432,
  database: database_name,
  ssl: true
});

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
  client.connect((err) => {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT id FROM users WHERE pass=$1',[req.body.password], (err, result) => {
      if(err) {
        return console.error('error running query', err);
      }
      // if(result.rows.length > 1){
        client.query('INSERT INTO posts(title, description, like_count) VALUES($1, $2, $3)',[req.body.title, req.body.comment, 0], (err, result) => {
          console.log(result);
          client.end();
          res.send("OK");
        });
      // } else {
      //   return console.error('パスワードが違います', err);
      // }
      console.log(result);

    });
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
