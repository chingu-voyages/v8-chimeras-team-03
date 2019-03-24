const admin = require('firebase-admin');

let serviceAccount = require('../toggl-db-firebase-adminsdk-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

function getTasks() {
  db.collection('tasks').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
}

module.exports = {
  getTasks: getTasks,
}
