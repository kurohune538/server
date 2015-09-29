"use strict";
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '..', 'config.json')).database_url;
var username = require(path.join(__dirname, '..', 'config.json')).db_user_name;
var password = require(path.join(__dirname, '..', 'config.json')).db_pass;
var host = require(path.join(__dirname, '..', 'config.json')).host;
var database_name = require(path.join(__dirname, '..', 'config.json')).database_name;
var client = new pg.Client({
  user: username,
  password: password,
  host: host,
  port: 5432,
  database: database_name,
  ssl: true
});

client.connect((err) => {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  // client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name text, pass text, photo text)', (err, result) => {
  //   if(err) {
  //     return console.error('error running query', err);
  //   }
  //   console.log(result);
    client.query('CREATE TABLE posts(id SERIAL PRIMARY KEY, user_id int, title text, photo text, description text, like_count int)', (err, result) => {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
      client.query('CREATE TABLE comments(id SERIAL PRIMARY KEY, user_id int, content text, prefecture text)', (err, result) => {
        if(err) {
          return console.error('error running query', err);
        }
        console.log(result);
      });
    //});
    client.end();
  });
});
