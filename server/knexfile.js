const knex = require('knex');
const dotenv = require('dotenv');


dotenv.config();

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/db.sqlite'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  },
  useNullAsDefault: true,
}