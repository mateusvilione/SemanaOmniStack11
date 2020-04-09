require('dotenv').config()

module.exports = {

  development: {
    client: process.env.CLIENT,
    connection: process.env.PG_CONNECTION_STRING,     
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: process.env.TEST_CLIENT,
    connection: {
      host: process.env.TEST_HOST_DB,
      port: process.env.TEST_PORT_DB,
      database: process.env.TEST_DATABASE,
      user: process.env.TEST_USER_DB,
      password: process.env.TEST_PASSWORD_DB,
      ssl: true
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
