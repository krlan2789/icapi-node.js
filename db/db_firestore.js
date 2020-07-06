const admin = require('firebase-admin');
const serviceAccount = require('./icapi-key.json');

// Access from Cloud Function
/*
const admin = require('firebase-admin');
const admin = require('firebase-admin');  
admin.initializeApp();
*/

// Access from Cloud Platform
/*
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
*/

// Access from Other Server
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
  
let db = admin.firestore();

module.exports = db;