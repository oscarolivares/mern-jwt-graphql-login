if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || 'mongodb://localhost/mongodbgraphql',
  SECRET: process.env.SECRET || 'SECRET',
  CORS: true,
  CORS_ORIGIN: 'http://192.168.0.120:4000'
};

export default config;
