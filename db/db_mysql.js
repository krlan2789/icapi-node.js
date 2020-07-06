const mysql = require('mysql');

// Database Connetion
const db = {
  dbConn: mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'icapi',
    user: 'root',
    password: ''
  })
}

module.exports = db;