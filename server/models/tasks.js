const admin = require('firebase-admin');

let serviceAccount = require('../toggl-db-firebase-adminsdk-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

function getTask(cb) {
  db.collection('tasks').get('one')
  .then(doc => {
    cb(null, doc);
  })
  .catch((err) => cb(err))
}

module.exports = {
  getTask: getTask,
}
