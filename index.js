'use strict';

let { start, sequelizeDatabase} = require('./src/server');
// let { sequelizeDatabase } = require('./src/auth/');
sequelizeDatabase.sync()
  .then(() => {
    console.log('successfully connected');
    start();
  })
  .catch((e) => console.error(e));
