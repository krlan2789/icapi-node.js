const db = require('../db/db_mysql');
const content = require('./m_content');

const modal = {
  read: function(queryString, callback) {
    db.dbConn.query(queryString, function(err, rows, fields) {
      content.error = (err) ? err : null;
      content.data = JSON.parse(JSON.stringify((rows.length > 1) ? rows : rows[0]));
      callback(content);
    });
  },
  insert: function(queryString, values, callback) {
    db.dbConn.query(queryString, values, function(err, rows, fields) {
      content.error = (err) ? err : null;
      content.data = Object.assign({}, rows);
      callback(content);
    });
  },
  update: function(queryString, callback) {
    db.dbConn.query(queryString, function(err, rows, fields) {
      content.error = (err) ? err : null;
      content.data = Object.assign({}, rows);
      callback(content);
    });
  },
  delete: function(queryString, callback) {
    db.dbConn.query(queryString, function(err, rows, fields) {
      content.error = (err) ? err : null;
      content.data = Object.assign({}, rows);
      callback(content);
    });
  }
};

module.exports = modal;