const path = require('path');

module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'production') {
    const { parse } = require('pg-connection-string');
    const config = parse(env('DATABASE_URL'));

    return {
      connection: {
        client: 'postgres',
        connection: {
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: { rejectUnauthorized: false }, // Nécessaire pour Render
        },
        debug: false,
      },
    };
  }

  // Configuration par défaut pour le développement (SQLite)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };
};