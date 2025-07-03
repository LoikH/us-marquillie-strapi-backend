const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connection = {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
    postgres: {
      client: 'pg',
      connection: env.url('DATABASE_URL'),
      ssl: { rejectUnauthorized: false },
      debug: false,
    },
  };

  return {
    connection: connection[client],
  };
};
