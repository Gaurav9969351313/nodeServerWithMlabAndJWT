const express = require('express');
const jwt = require('jsonwebtoken');
const checkJwt = require('express-jwt');

function apiRouter(database) {
  const router = express.Router();

  //jwt token copied from https://www.grc.com/passwords.htm
  //localhost:3000/api/contacts

  
  // router.use(
  //     checkJwt({
  //       secret: "eXqkwXqo7Liptsb5dSHlR7UakV8r7fdF5OtLjW1wVNwMtTGDvylaDlIxfFjnRu7"
  //     }).unless({
  //       path: '/api/authenticate'
  //     })
  // );

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });

  router.get('/contacts', (req, res) => {

    const contactsCollection = database.db('testdb1994').collection('contacts');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  router.post('/contacts', (req, res) => {
    const user = req.body;

    const contactsCollection = database.db('testdb1994').collection('contacts');

    contactsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.db('testdb1994').collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.status(404).json({ error: 'user not found' })
        }

        const payload = {
          username: result.username,
          admin: result.admin
        };

        const JWT_SECRET = "eXqkwXqo7Liptsb5dSHlR7UakV8r7fdF5OtLjW1wVNwMtTGDvylaDlIxfFjnRu7";

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });

        return res.json({
          message: 'successfuly authenticated',
          token: token
        });
      });
  });

  return router;
}

module.exports = apiRouter;
