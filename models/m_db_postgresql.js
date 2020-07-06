const db = require('../db/');
const content = require('./m_content');

const modal = {
  read: function(id, callback) {
    let queryString = 'SELECT * FROM titlecollection';
  },
  insert: function(values, callback) {
    const queryString = 'INSERT INTO titlecollection (codeTC, titleTC, creatorTC, dateTC) VALUES (?)';
  },
  update: function(values, callback) {
    const queryString = `UPDATE titlecollection SET 
                        titleTC='${values.title}', 
                        creatorTC='${values.creator}', 
                        dateTC='${values.date}' 
                        WHERE codeTC='${values.code}'`;
  },
  delete: function(id, callback) {
    const queryString = `DELETE FROM titlecollection WHERE codeTC='${id}'`;
  }
};

module.exports = modal;