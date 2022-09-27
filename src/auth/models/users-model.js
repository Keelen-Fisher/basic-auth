'use strict';

// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;

let options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
} : {};

// instantiate database
const sequelizeDatabase = new Sequelize(DATABASE_URL, options);

// Create a Sequelize model
const UsersModel = sequelizeDatabase.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = {
  UsersModel,
  sequelizeDatabase,
};