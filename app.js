"use strict";

const path = require("path");

const express = require("express");
const st = require("st");
// const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const db = require("./util/db");

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
  db.one('SELECT id FROM users WHERE pass=$1', req.body.password)
    .then(data => {
      if (data.id !== void 0) {
        return db.query('INSERT INTO posts(user_id, title, description, like_count) VALUES($1, $2, $3, $4)',
        [data.id, req.body.title, req.body.comment, 0]);
      }
    })
    .then(data => {
      //success
      res.send("OK");
    })
    .catch(error => {
      console.error(error);
      res.send("error");
    });
});

app.get("/yokome_admin/post/show", (req, res) => {
  db.query(`SELECT p.title,p.photo,p.description,p.like_count,p.created_at,u.name,u.photo
  FROM posts AS p
  LEFT JOIN users AS u ON p.user_id=u.id
  ORDER BY p.id`)
    .then(data => {
      res.json(data);
    })
    .catch((err) => {
      console.error("could not select posts", err);
      res.statusCode("404").json({
        error: 'could not select posts'
      });
    })
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
