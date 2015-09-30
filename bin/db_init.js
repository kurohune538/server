"use strict";

const db = require("../util/db");

db.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name text, pass text, photo text, created_at TIMESTAMP NOT NULL DEFAULT now()))')
  .then(data => {
    console.log(data);
    return db.query(
      'CREATE TABLE posts(id SERIAL PRIMARY KEY, user_id int, title text, photo text, description text, like_count int, created_at TIMESTAMP NOT NULL DEFAULT now()))');
  })
  .then(data => {
    console.log(data);
    return db.query(
      'CREATE TABLE comments(id SERIAL PRIMARY KEY, user_id int, content text, prefecture text, created_at TIMESTAMP NOT NULL DEFAULT now())');
  })
  .then(() => {
    console.log("done!");
  })
  .catch((err) => {
    console.error("failed to create table", err);
  });
