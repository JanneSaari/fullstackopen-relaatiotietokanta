require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(encodeURI(process.env.PGHOST))

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()