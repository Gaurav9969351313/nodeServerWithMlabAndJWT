const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const createExpressApp = require('./create-express-app');

const DB_CONN = "mongodb://admin:admin123@ds121183.mlab.com:21183/testdb1994";

MongoClient.connect(DB_CONN, (err, db) => {

  console.log('connected to mongodb...');

  createExpressApp(db)
    .listen(3000, () => {
      database = db;
      console.log('listening on port 3000...');
    });

});
