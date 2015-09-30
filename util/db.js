"use strict";

const path = require('path');
const pgp = require('pg-promise')();

const config = require(path.join(__dirname, '..', 'config.json'));

module.exports = pgp(config.db);
