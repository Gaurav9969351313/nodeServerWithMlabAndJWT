const MongoClient = require('mongodb').MongoClient;

const users = require('./users');
const contacts = require('./contacts');

function seedCollection(collectionName, initialRecords) {

  var DB_CONN = "mongodb://admin:admin123@ds121183.mlab.com:21183/testdb1994";

  MongoClient.connect(DB_CONN, (err, client) => {
    var db = client.db('testdb1994');

    const collection = db.collection(collectionName);

    collection.insertMany(initialRecords, (err, result) => {
              console.log(`${result.insertedCount} records inserted.`);
              console.log('closing connection...');
              console.log('done.');
            });

    db.collection('users').find({}).toArray(function (err, docs) {

      docs.forEach(function (doc) {
        console.log(doc);
      });

      client.close();
    });

  });  
}

seedCollection('users', users);
seedCollection('contacts', contacts);