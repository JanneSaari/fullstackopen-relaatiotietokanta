require('dotenv').config()

module.exports = {
  DATABASE_URL: encodeURI(process.env.DATABASE_URL),
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
  SESSION_LIFETIME: 1000 * 60 * 60 * 24 // Session lifetime in milliseconds
}