const path = require("path");
const fs = require("fs");

/*
  Database Used.
  E.g : mysql, firestore, postgresql, mongodb, etc
*/
const dbName = 'mysql';

// Get all database models
function getFiles (dir, files_) {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    files_.push(files[i].replace('.js', ''));
  }
  return files_;
}

const dbList = getFiles(path.join(__dirname, '/'));

// Exported Object
const dbUsed = {
  db: require('./' + dbList[dbList.indexOf('m_db_' + dbName)]),
  // Get Current Date
  GetDateNow: function() {
    const dateNow = new Date(Date.now());
    return '' + dateNow.getFullYear() 
    + (((dateNow.getMonth() < 9) ? '0'+ (dateNow.getMonth()+1) : dateNow.getMonth()+1)) 
    + (((dateNow.getDate() <= 9) ? '0'+ (dateNow.getDate()) : dateNow.getDate())) 
    + (((dateNow.getHours() <= 9) ? '0'+ (dateNow.getHours()) : dateNow.getHours())) 
    + (((dateNow.getMinutes() <= 9) ? '0'+ (dateNow.getMinutes()) : dateNow.getMinutes())) 
    + (((dateNow.getSeconds() <= 9) ? '0'+ (dateNow.getSeconds()) : dateNow.getSeconds()));
  }
};

module.exports = dbUsed;