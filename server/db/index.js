const mysql = require('mysql');
const createTables = require('./config');
const Promise = require('bluebird');
const database = 'shortly';
const mysqlCredentials = require('../../config/mysqlCredentials.js');

const connection = mysql.createConnection({
  user: mysqlCredentials.username,
  password: mysqlCredentials.password
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to ${database} database as ID ${db.threadId}`))
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));

module.exports = db;