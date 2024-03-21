require('dotenv').config()

module.exports = {
  DATABASE_URL: encodeURI(process.env.DATABASE_URL),
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET
}