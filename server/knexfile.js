const knex = require('knex');
const dotenv = require('dotenv');


dotenv.config();

module.exports = {
  client: process.env.DB_DIALECT,
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
  },
  migrations: {
    directory: './src/database/migrations'
  }
}