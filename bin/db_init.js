"use strict";

const client = require("../util/db");

client.connect();

client.query(
  'CREATE TABLE users(id SERIAL PRIMARY KEY, name text, pass text, photo text)',
  (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result);

    client.query(
      'CREATE TABLE posts(id SERIAL PRIMARY KEY, user_id int, title text, photo text, description text, like_count int)',
      (err2, result2) => {
        if (err2) {
          return console.error('error running query', err);
        }
        console.log(result2);

        client.query(
          'CREATE TABLE comments(id SERIAL PRIMARY KEY, user_id int, content text, prefecture text)',
          (err3, result3) => {
            if (err3) {
              return console.error('error running query', err);
            }
            console.log(result3);
            client.end();
          }
        );
      }
    );
  }
);
