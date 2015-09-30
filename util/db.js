"use strict";

const path = require('path');
const pg = require('pg');

const config = require(path.join(__dirname, '..', 'config.json'));

const client = new pg.Client(config.db);

module.exports = client;
