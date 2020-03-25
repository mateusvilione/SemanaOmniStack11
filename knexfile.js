require('dotenv').config()

module.exports = {

  development: {
    client: process.env.CLIENT,
    connection: {
      host: process.env.HOST_DB,
      port: process.env.PORT_DB,
      database: process.env.DATABASE,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
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
