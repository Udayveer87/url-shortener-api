require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/urlshortener',
  BASE_URL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 4000}`,
};
