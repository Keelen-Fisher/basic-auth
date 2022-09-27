'use strict';

// 3rd Party Resources
const express = require('express');
const basicAuth = ('./auth/middleware/basic');
const { sequelizeDatabase } = require('./auth/models/users-model');
const authRouter = require('./auth/router');


// NOTE: connected to sqlite::memory out of box for proof of life
// TODO: 
// connect postgres for local dev environment and prod
// handle SSL requirements
// connect with sqlite::memory for testing

const app = express();
// Prepare the express app
const PORT = process.env.PORT || 3002;



// Process JSON input and put the data on req.body
app.use(express.json());


// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);


// define a hello route that uses basic auth to safeguard response content
app.get('/hello', basicAuth, (req, res, next) => {
  let { name } = req.query;
  res.status(200).send(`Greetings ${name}! this route is now secured by Basic AUth!!!`);
});


// make sure our tables are created, start up the HTTP server.
sequelizeDatabase.sync()
  .then(() => {
    app.listen(PORT, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });
