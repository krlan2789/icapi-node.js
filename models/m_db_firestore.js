let db = require('../db/db_firestore');
const m_content = require('./m_content');

const modal = {
  read: function(id, callback) {
    const content = m_content;
    if (id == null) {
      db.collection('icapi').doc('titlecollection').collection('values').get()
        .then(snapshot => {
          if (snapshot.empty) {
            content.error = 'No matching documents.';
          }
          else {
            snapshot.forEach(doc => {
              let temp = {};
              temp.code = doc.id;
              temp.title = doc.data().title;
              temp.date = doc.data().date;
              temp.creator = doc.data().creator;
              content.data.push(temp);
            });
          }
          callback(content);
        })
        .catch(err => {
          content.error = 'Error getting document' + err;
          callback(content);
        });
    }
    else {
      db.collection('icapi').doc('titlecollection').collection('values').doc(id).get()
        .then(doc => {
          if (!doc.exists) {
            content.error = 'No such document!';
          } else {
            let temp = {};
            temp.code = doc.id;
            temp.title = doc.data().title;
            temp.date = doc.data().date;
            temp.creator = doc.data().creator;
            content.data = temp;
          }
          callback(content);
        })
        .catch(err => {
          content.error = 'Error getting document' + err;
          callback(content);
        });
      // docRef = citiesRef.where('capital', '==', true).get();
    }
  },
  insert: function(values, callback) {
    const content = m_content;
    values.forEach(value => {
      let docRef = db.collection('icapi').doc('titlecollection').collection('values').doc(value[0]);
      content.data = docRef.set({
        'title': value[1],
        'creator': value[2],
        'date': value[3]
      });
      console.log(content);
    });
    callback(content);
  },
  update: function(values, callback) {
    db.collection('icapi').doc('titlecollection').collection('values').doc(values[0]).get()
      .then(doc => {
        const content = m_content;
        if (!doc.exists) {
          content.error = 'No such document!';
        } else {
          let docRef = db.collection('icapi').doc('titlecollection').collection('values').doc(values[0]);
          docRef.set({
            'title': values[1],
            'creator': values[2],
            'date': values[3]
          });
          content.data = 'Success to update.';
        }
        callback(content);
      })
      .catch(err => {
        const content = m_content;
        content.error = 'Error getting document' + err;
        callback(content);
      });
  },
  delete: function(id, callback) {
    // Delete Document
    let deleteDoc = db.collection('icapi').doc('titlecollection').collection('values').doc(id).delete();
    // Delete Sub-Collection
    // let deleteCol = db.collection('icapi').doc('titlecollection').collection('values').doc(id).collection('').delete();
    console.log(deleteDoc);
    // callback(deleteDoc);
  }
};

module.exports = modal;